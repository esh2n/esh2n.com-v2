import { Hono } from "hono";
import { cache } from "hono/cache";
import { etag } from "hono/etag";
import { generateImage } from "./image";
import { Card } from "./card";
import { ReactNode } from "react";
import { R2Bucket } from "@cloudflare/workers-types";

type Bindings = {
	BUCKET: R2Bucket;
};

let notoSansBoldFontArrBuf: null | ArrayBuffer = null;
let notoSansRegularFontArrBuf: null | ArrayBuffer = null;

const ogp = new Hono<{ Bindings: Bindings }>()
	.use(
		"/",
		etag(),
		cache({
			cacheName: "ogp",
			cacheControl: "public, max-age=604800",
		}),
	)
	.get("/", async (c) => {
		try {
			const pageTitle = String(c.req.query("pageTitle") || "").slice(0, 100);
			const title = String(c.req.query("title") || "").slice(0, 200);
			const date = String(c.req.query("date") || "").slice(0, 200);
			const description = String(c.req.query("description") || "").slice(
				0,
				200,
			);
			const image = String(c.req.query("image") || "").slice(0, 200);
			const tags = String(c.req.query("tags") || "")
				.split(",")
				.map((tag) => tag.trim())
				.slice(0, 5);

			if (notoSansRegularFontArrBuf === null) {
				const fontObj = await c.env.BUCKET.get("fonts/NotoSansJP-Regular.ttf");
				if (!fontObj) {
					return c.text("Font not found", 404);
				}
				notoSansRegularFontArrBuf = await fontObj.arrayBuffer();
			}

			if (notoSansBoldFontArrBuf === null) {
				const fontObj = await c.env.BUCKET.get("fonts/NotoSansJP-Bold.ttf");
				if (!fontObj) {
					return c.text("Font not found", 404);
				}
				notoSansBoldFontArrBuf = await fontObj.arrayBuffer();
			}

			const card = (
				<Card
					pageTitle={pageTitle}
					title={title}
					date={date}
					description={description}
					image={image}
					tags={tags}
				/>
			);
			const img = await generateImage(
				card as ReactNode,
				1200,
				630,
				[
					{
						name: "NotoSansJPRegular",
						data: notoSansRegularFontArrBuf,
						weight: 400,
						style: "normal",
					},
					{
						name: "NotoSansJPBold",
						data: notoSansBoldFontArrBuf,
						weight: 700,
						style: "normal",
					},
				],
				async () => [],
			);

			// Generate a safe key for R2
			const safeKey =
				`cache/${encodeURIComponent(title)}-${Date.now()}.png`.slice(0, 1024);
			const uint8Array = new Uint8Array(img.buffer);
			await c.env.BUCKET.put(safeKey, uint8Array);

			return new Response(uint8Array, {
				status: 200,
				headers: {
					"Content-Type": "image/png",
				},
			});
		} catch (e: any) {
			console.error("OGP generation error:", e);
			return c.text(`Error generating OGP image: ${e.message}`, 500);
		}
	});

export { ogp };

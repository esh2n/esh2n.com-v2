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

let fontArrBuf: null | ArrayBuffer = null;

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

			const list = await c.env.BUCKET.list();
			if (fontArrBuf === null) {
				const fontObj = await c.env.BUCKET.get("fonts/FiraCode-Regular.ttf");
				if (!fontObj) {
					return c.text("Font not found", 404);
				}
				fontArrBuf = await fontObj.arrayBuffer();
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
						name: "FiraCode-Regular",
						data: fontArrBuf,
						weight: 400,
						style: "normal",
					},
				],
				async () => [],
			);
			const key = new URL(c.req.url).searchParams.toString();
			const uint8Array = new Uint8Array(img.buffer);
			await c.env.BUCKET.put(`cache/${key}.png`, uint8Array);
			return new Response(uint8Array, {
				status: 200,
				headers: {
					"Content-Type": "image/png",
				},
			});
		} catch (e) {
			return c.text(`Error: ${e}`, 500);
		}
	});

export { ogp };
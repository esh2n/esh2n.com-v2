import { Hono } from "hono";
import { cache } from "hono/cache";
import { etag } from "hono/etag";
import { generateImage } from "./image";
import { Card } from "./card";
import { ReactNode } from "react";

type Bindings = {
	BUCKET: R2Bucket;
};

const ogp = new Hono<{ Bindings: Bindings }>();
let fontArrBuf: null | ArrayBuffer = null;

ogp.use(
	"/",
	etag(),
	cache({
		cacheName: "ogp",
		cacheControl: "public, max-age=604800",
	}),
);

/// example: http://localhost:8787/api/ogp?title=test&date=2021-01-01&description=test&image=https://example.com/image.png
ogp.get("/", async (c) => {
	try {
		const title = String(c.req.query("title") || "").slice(0, 200);
		const date = String(c.req.query("date") || "").slice(0, 200);
		const description = String(c.req.query("description") || "").slice(0, 200);
		const image = String(c.req.query("image") || "").slice(0, 200);

		const list = await c.env.BUCKET.list();
		console.log("list", list);
		console.log(title, date, description, image);
		if (fontArrBuf === null) {
			const fontObj = await c.env.BUCKET.get("fonts/FiraCode-Regular.ttf");
			console.log(fontObj);
			if (!fontObj) {
				return c.text("Font not found", 404);
			}
			fontArrBuf = await fontObj.arrayBuffer();
		}

		const card = (
			<Card title={title} date={date} description={description} image={image} />
		);
		console.log(card);
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
		console.log(key);
		await c.env.BUCKET.put(`cache/${key}.png`, img);
		return c.body(img, 200, {
			"Content-Type": "image/png",
		});
	} catch (e) {
		return c.text(`Error: ${e}`, 500);
	}
});

export { ogp };

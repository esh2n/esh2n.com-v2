import { Hono } from "hono";
import { getContent, getPosts, initNotion } from "./notion";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Bindings = {
	NOTION_TOKEN: string;
	NOTION_DATABASE_ID: string;
};

const notion = new Hono<{ Bindings: Bindings }>();

notion.use("*", async (c, next) => {
	const { NOTION_TOKEN, NOTION_DATABASE_ID } = c.env;
	if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
		return c.json({ error: "Notion token or database ID not found" }, 500);
	}
	return next();
});

notion.all("*", async (c, next) => {
	initNotion(c.env.NOTION_TOKEN);
	await next();
});

notion.get("/posts", async (c) => {
	const posts = await getPosts(c.env.NOTION_DATABASE_ID);
	return c.json(
		{
			posts,
		},
		200,
	);
});

const getPostSchema = z.object({
	id: z.string(),
});

notion.get(
	"/posts/:id{[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}}",
	zValidator("param", getPostSchema),
	async (c) => {
		const { id } = c.req.valid("param");
		const post = await getContent(id);
		if (!post) {
			return c.json(
				{
					error: "Post not found",
				},
				404,
			);
		}
		return c.json(
			{
				post,
			},
			200,
		);
	},
);

export { notion };

import { Hono } from "hono";
import { getContent, getPosts } from "./notion";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const notion = new Hono();

notion.get("/", (c) => {
	return c.text("Hello Notion!");
});

notion.get("/posts", async (c) => {
	const posts = await getPosts();
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

notion.get("/posts/:id", zValidator("param", getPostSchema), async (c) => {
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
});

export { notion };

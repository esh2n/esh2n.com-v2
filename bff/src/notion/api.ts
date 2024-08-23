import { Hono } from "hono";
import {
	getContent,
	getContentBySlug,
	getPostInfo,
	getPosts,
	getTotalPostsCount,
	initNotion,
	toMarkdownString,
} from "./notion";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { etag } from "hono/etag";
import { cache } from "hono/cache";

type Bindings = {
	NOTION_TOKEN: string;
	NOTION_DATABASE_ID: string;
};

const getPostSchema = z.object({
	id: z.string(),
});

const getPostsSchema = z.object({
	pageSize: z.string().transform(Number),
	startCursor: z.string().optional(),
});

const getPostBySlugSchema = z.object({
	slug: z.string(),
});

const notion = new Hono<{ Bindings: Bindings }>()
	.use("*", async (c, next) => {
		const { NOTION_TOKEN, NOTION_DATABASE_ID } = c.env;
		if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
			return c.json({ error: "Notion token or database ID not found" }, 500);
		}
		return next();
	})
	.use(
		"/posts",
		etag(),
		cache({
			cacheName: "notion",
			cacheControl: "public, max-age=604800",
		}),
	)
	.all("*", async (c, next) => {
		initNotion(c.env.NOTION_TOKEN);
		await next();
	})
	.get("/posts", zValidator("query", getPostsSchema), async (c) => {
		const { pageSize, startCursor } = c.req.valid("query");
		const posts = await getPosts(
			c.env.NOTION_DATABASE_ID,
			pageSize,
			startCursor,
		);
		return c.json(
			{
				posts,
			},
			200,
		);
	})
	.get(
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
	)
	.get("/posts/:slug", zValidator("param", getPostBySlugSchema), async (c) => {
		const { slug } = c.req.valid("param");
		const post = await getContentBySlug(c.env.NOTION_DATABASE_ID, slug);
		if (!post) {
			return c.json(
				{
					error: "Post not found",
				},
				404,
			);
		}
		return c.json({ post }, 200);
	})
	.get(
		"/posts/content/:slug",
		zValidator("param", getPostBySlugSchema),
		async (c) => {
			const { slug } = c.req.valid("param");
			const { content, postInfo } = await getContentBySlug(
				c.env.NOTION_DATABASE_ID,
				slug,
			);
			if (!content) {
				return c.json({ error: "Post not found" }, 404);
			}
			const str = await toMarkdownString(content);
			return c.json({ content: str, postInfo }, 200);
		},
	)
	.get("/posts/count", async (c) => {
		const count = await getTotalPostsCount(c.env.NOTION_DATABASE_ID);
		return c.json({ count }, 200);
	});

export { notion };

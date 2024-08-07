import type { AppType } from "@esh2n.com/bff";
import { hc } from "hono/client";

const client = hc<AppType>("https://bff.esh2n.workers.dev/");

/// NOTION
export const getAllPosts = async () => {
	const res = await client.api.notion.posts.$get();
	if (res.status !== 200) {
		throw new Error("Failed to fetch posts");
	}
	return (await res.json()).posts;
};

export const getPostContentBySlug = async (slug: string) => {
	const res = await client.api.notion.posts[":slug"].$get({
		param: { slug },
	});
	if (res.status !== 200) {
		throw new Error("Failed to fetch post");
	}
	return (await res.json()).post;
};

export const getPostStrMDContentBySlug = async (slug: string) => {
	const res = await client.api.notion.posts.content[":slug"].$get({
		param: { slug },
	});
	if (res.status !== 200) {
		throw new Error("Failed to fetch posts");
	}
	return await res.json();
};

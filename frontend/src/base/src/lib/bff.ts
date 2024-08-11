import type { AppType } from "@esh2n.com/bff";
import { hc } from "hono/client";

const client = hc<AppType>(process.env.NEXT_PUBLIC_BFF_URI ?? "");

/// NOTION
export const getAllPosts = async (pageSize = 10, startCursor?: string) => {
	const strPageSize = pageSize.toString();
	const res = await client.api.notion.posts.$get({
		query: {
			pageSize: strPageSize,
			startCursor: startCursor ?? "",
		},
	});
	if (res.status !== 200) {
		throw new Error("Failed to fetch posts");
	}

	const data = await res.json();
	return {
		posts: data.posts,
		nextCursor: data.posts.nextCursor,
	};
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

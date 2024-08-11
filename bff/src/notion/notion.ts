import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { MdBlock } from "notion-to-md/build/types";

let notion: Client;
let n2m: NotionToMarkdown;
export const initNotion = (token: string) => {
	notion = new Client({
		auth: token,
	});
	n2m = new NotionToMarkdown({ notionClient: notion });
};

interface NotionPost {
	id: string;
	title: string;
	tags: string[];
	author: string;
	colorCode: string;
	emoji: string;
	slug: string;
	createdAt: string;
	updatedAt: string;
}

export async function getPosts(
	databaseId: string,
	pageSize: number,
	startCursor?: string,
): Promise<{ posts: NotionPost[]; nextCursor: string | null }> {
	let response;
	if (startCursor && startCursor !== "") {
		response = await notion.databases.query({
			database_id: databaseId,
			page_size: pageSize,
			start_cursor: startCursor,
			sorts: [
				{
					property: "CreatedAt",
					direction: "descending",
				},
			],
		});
	} else {
		response = await notion.databases.query({
			database_id: databaseId,
			page_size: pageSize,
			sorts: [
				{
					property: "CreatedAt",
					direction: "descending",
				},
			],
		});
	}

	const posts = response.results.map((post: any) => ({
		id: post.id,
		title: post.properties.Title.title[0]?.plain_text,
		tags: post.properties.Tags.multi_select.map((item: any) => item.name),
		author: post.properties.Author.select.name,
		colorCode: post.properties.ColorCode.rich_text[0]?.plain_text,
		emoji: post.properties.Emoji.rich_text[0]?.plain_text,
		slug: post.properties.Slug.rich_text[0]?.plain_text,
		createdAt: post.properties.CreatedAt.date.start,
		updatedAt: post.properties.UpdatedAt.date.start,
	}));

	return {
		posts,
		nextCursor: response.next_cursor,
	};
}

export const getContent = async (id: string) => {
	return await n2m.pageToMarkdown(id, 2);
};

export const toMarkdownString = async (mdBlock: MdBlock[]) => {
	return n2m.toMarkdownString(mdBlock);
};

export const getPostInfo = async (post: any) => {
	const id = post.id;
	const title = post.properties.Title.title[0]?.plain_text;
	const tags = post.properties.Tags.multi_select.map((item: any) => item.name);
	const author = post.properties.Author.select.name;
	const colorCode = post.properties.ColorCode.rich_text[0]?.plain_text;
	const emoji = post.properties.Emoji.rich_text[0]?.plain_text;
	const slug = post.properties.Slug.rich_text[0]?.plain_text;
	const createdAt = post.properties.CreatedAt.date.start;
	const updatedAt = post.properties.UpdatedAt.date.start;
	return {
		id,
		title,
		tags,
		author,
		colorCode,
		emoji,
		slug,
		createdAt,
		updatedAt,
	};
};

export const getContentBySlug = async (databaseId: string, slug: string) => {
	const response = await notion.databases.query({
		database_id: databaseId,
		sorts: [
			{
				property: "CreatedAt",
				direction: "descending",
			},
		],
		filter: {
			property: "Slug",
			rich_text: {
				equals: slug,
			},
		},
	});
	const post = response.results[0];
	const content = await n2m.pageToMarkdown(post.id, 2);
	const postInfo = await getPostInfo(post);
	return { content, postInfo };
};

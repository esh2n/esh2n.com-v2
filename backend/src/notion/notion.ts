import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });


interface NotionPost {
	id: string;
    title: string;
    tags: string[];
    author: string;
    colorCode: string;
    createdAt: string;
}

export async function getPosts(): Promise<NotionPost[]> {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID ?? "",
		sorts: [
			{
				property: "CreatedAt",
				direction: "descending",
			},
		],
	});
	const posts = response.results;
	const postsProperties = posts.map((post: any) => {
		const id = post.id;
        const title = post.properties.Title.title[0]?.plain_text;
        const tags = post.properties.Tags.multi_select.map((item: any) => item.name);
        const author = post.properties.Author.select.name;
        const colorCode = post.properties.ColorCode.rich_text[0]?.plain_text;
        const createdAt = post.properties.CreatedAt.created_time;
		return { id, title, tags, author, colorCode, createdAt };
	});
	return postsProperties;
}

export const getContent = async (id: string) => {
    return await n2m.pageToMarkdown(id, 2);
}


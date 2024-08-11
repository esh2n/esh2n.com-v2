import { getAllPosts } from "@/lib/bff";
import BlogsWrapper from "./BlogsWrapper";

export const revalidate = 600;

export const metadata = {
	title: "Blogs",
};

export interface Post {
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

const Blogs = async () => {
	const res = await getAllPosts(10, "");
	const { posts } = res.posts;

	return <BlogsWrapper posts={posts} />;
};

export default Blogs;

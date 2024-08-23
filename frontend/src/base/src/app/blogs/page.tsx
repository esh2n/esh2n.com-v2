import { getAllPosts, getTotalPostsCount } from "@/lib/bff";
import { Suspense } from "react";
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

export interface PostsResponse {
	posts: Post[];
	nextCursor: string | null;
}

const POSTS_PER_PAGE = 9; // 3x3 grid

const Blogs = async ({ searchParams }: { searchParams: { page?: string } }) => {
	const currentPage = searchParams.page
		? Number.parseInt(searchParams.page)
		: 1;
	const res = await getAllPosts(POSTS_PER_PAGE, "");
	const totalPosts = await getTotalPostsCount();
	const { posts, nextCursor } = res.posts;

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BlogsWrapper
				initialPosts={posts}
				initialNextCursor={nextCursor}
				currentPage={currentPage}
				postsPerPage={POSTS_PER_PAGE}
				totalPosts={totalPosts}
			/>
		</Suspense>
	);
};

export default Blogs;

"use client";

import { activeTabState } from "@/atoms/tabsState";
import { getAllPosts } from "@/lib/bff";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import type { Post } from "./page";

const BlogsCode = dynamic(() => import("./BlogsCode"), { ssr: false });
const BlogsContent = dynamic(() => import("./BlogsContent"), {
	ssr: false,
});

const BlogsWrapper = ({
	initialPosts,
	initialNextCursor,
	currentPage,
	postsPerPage,
	totalPosts,
}: {
	initialPosts: Post[];
	initialNextCursor: string | null;
	currentPage: number;
	postsPerPage: number;
	totalPosts: number;
}) => {
	const activeTab = useRecoilValue(activeTabState);
	const [posts, setPosts] = useState(initialPosts);
	const [nextCursor, setNextCursor] = useState(initialNextCursor);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const totalPages = Math.ceil(totalPosts / postsPerPage);
	const hasNextPage = currentPage < totalPages;

	useEffect(() => {
		if (
			currentPage > 1 &&
			posts.length < currentPage * postsPerPage &&
			nextCursor
		) {
			loadMore();
		}
	}, [currentPage, posts.length, postsPerPage, nextCursor]);

	const loadMore = async () => {
		if (loading || !nextCursor) return;

		setLoading(true);
		const res = await getAllPosts(postsPerPage, nextCursor);
		const { posts: newPosts, nextCursor: newNextCursor } = res.posts;

		setPosts([...posts, ...newPosts]);
		setNextCursor(newNextCursor);
		setLoading(false);
	};

	const goToPage = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		router.push(`/blogs?${params.toString()}`);
	};

	const currentPosts = posts.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage,
	);

	return (
		<>
			{activeTab.isCode ? (
				<BlogsCode posts={currentPosts} />
			) : (
				<BlogsContent
					posts={currentPosts}
					currentPage={currentPage}
					totalPages={totalPages}
					hasNextPage={hasNextPage}
					goToPage={goToPage}
					loading={loading}
				/>
			)}
		</>
	);
};

export default BlogsWrapper;

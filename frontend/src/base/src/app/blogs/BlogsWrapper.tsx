"use client";

import { activeTabState } from "@/atoms/tabsState";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";
import type { Post } from "./page";

const BlogsCode = dynamic(() => import("./BlogsCode"), { ssr: false });
const BlogsContent = dynamic(() => import("./BlogsContent"), {
	ssr: false,
});

const BlogsWrapper = ({ posts }: { posts: Post[] }) => {
	const activeTab = useRecoilValue(activeTabState);
	return (
		<>
			{activeTab.isCode ? (
				<BlogsCode posts={posts} />
			) : (
				<BlogsContent posts={posts} />
			)}
		</>
	);
};

export default BlogsWrapper;

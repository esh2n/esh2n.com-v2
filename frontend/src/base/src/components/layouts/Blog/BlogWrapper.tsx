"use client";

import { activeTabState } from "@/atoms/tabsState";
import type { PostResponse } from "@/types/post";
import dynamic from "next/dynamic";
import { useRecoilValue } from "recoil";

export type PostResponseWithOGP = PostResponse & {
	ogpImageUrl: string;
};

const BlogCode = dynamic(() => import("./BlogCode"), { ssr: false });
const BlogContent = dynamic(() => import("./BlogContent"), { ssr: false });

const BlogWrapper = ({ post }: { post: PostResponseWithOGP }) => {
	const activeTab = useRecoilValue(activeTabState);

	return (
		<>
			{activeTab.isCode ? (
				<BlogCode post={post} />
			) : (
				<BlogContent post={post} />
			)}
		</>
	);
};

export default BlogWrapper;

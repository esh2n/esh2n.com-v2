"use client";

import { activeTabState } from "@/atoms/tabsState";
import type { PostResponse } from "@/types/post";
import { Suspense, lazy } from "react";
import { useRecoilValue } from "recoil";

export type PostResponseWithOGP = PostResponse & {
	ogpImageUrl: string;
};

const BlogCode = lazy(() => import("./BlogCode"));
const BlogContent = lazy(() => import("./BlogContent"));

const BlogWrapper = ({ post }: { post: PostResponseWithOGP }) => {
	const activeTab = useRecoilValue(activeTabState);

	return (
		<Suspense fallback={<div>Loading...</div>}>
			{activeTab.isCode ? (
				<BlogCode post={post} />
			) : (
				<BlogContent post={post} />
			)}
		</Suspense>
	);
};

export default BlogWrapper;

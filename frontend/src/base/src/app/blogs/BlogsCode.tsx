import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";
import type { Post } from "./page";

const BlogListDataView = ({ posts }: { posts: Post[] }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const blogListData = {
		metadata: {
			title: "Blogs",
			description: "Latest 5 posts",
		},
		posts: posts.slice(0, 5).map((post) => ({
			title: post.title,
			slug: post.slug,
			emoji: post.emoji,
			createdAt: post.createdAt,
			updatedAt: post.updatedAt,
			author: post.author,
			tags: post.tags,
		})),
	};

	const jsonContent = JSON.stringify(blogListData, null, 2);
	const contentLines = jsonContent.split("\n");

	return (
		<div className="blog-list-data tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={jsonContent} language="json" />
			</div>
		</div>
	);
};

export default BlogListDataView;

"use client";

import type { Post } from "@/types/post";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogCardProps {
	post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const content = (
		<Link href={`/blogs/${post.slug}`} className="tw-block tw-h-full">
			<div className="tw-p-6 tw-flex tw-flex-col tw-h-full">
				<div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
					<span className="tw-text-4xl">{post.emoji}</span>
					<span className="tw-text-sm tw-text-muted-foreground">
						{format(new Date(post.createdAt), "yyyy年MM月dd日", {
							locale: ja,
						})}
					</span>
				</div>
				<h3 className="tw-text-xl tw-font-semibold tw-text-primary tw-mb-2">
					{post.title}
				</h3>
				<p className="tw-text-secondary tw-mb-4">by {post.author}</p>
				<div className="tw-flex tw-flex-wrap tw-gap-2 tw-mb-4">
					{post.tags.map((tag) => (
						<span
							key={tag}
							className="tw-px-2 tw-py-1 tw-text-xs tw-bg-accent tw-text-accent-foreground tw-rounded-full"
						>
							{tag}
						</span>
					))}
				</div>
				<p className="tw-text-sm tw-text-muted-foreground tw-mt-auto">
					最終更新:{" "}
					{format(new Date(post.updatedAt), "yyyy年MM月dd日", { locale: ja })}
				</p>
			</div>
		</Link>
	);

	if (!isMounted) {
		return (
			<div className="tw-bg-card tw-text-card-foreground tw-rounded-lg tw-shadow-md tw-overflow-hidden">
				{content}
			</div>
		);
	}

	return (
		<motion.div
			className="tw-bg-card tw-text-card-foreground tw-rounded-lg tw-shadow-md tw-overflow-hidden"
			whileHover={{ scale: 1.03 }}
			transition={{ type: "spring", stiffness: 300 }}
		>
			{content}
		</motion.div>
	);
};

export default BlogCard;

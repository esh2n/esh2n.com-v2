"use client";

import MarkdownRenderer from "@/components/elements/MarkdownRenderer";
import { CalendarIcon, TagIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { PostResponseWithOGP } from "./BlogWrapper";

const BlogContent = ({ post }: { post: PostResponseWithOGP }) => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const { title, tags, author, emoji, createdAt, updatedAt } = post.postInfo;
	const { ogpImageUrl } = post;
	return (
		<div className="tw-max-w-4xl tw-mx-auto tw-px-4 tw-py-8">
			<header className="tw-mb-8">
				<h1 className="tw-text-4xl tw-font-bold tw-mb-6 tw-text-primary">
					{emoji} {title}
				</h1>
				<div className="tw-flex tw-flex-wrap tw-items-center tw-text-sm tw-text-gray-600 tw-mb-6 tw-bg-gray-100 tw-rounded-lg tw-p-4">
					<div className="tw-flex tw-items-center tw-mr-6 tw-mb-2">
						<CalendarIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-text-primary" />
						<span className="tw-font-medium tw-text-foreground">
							作成日: {new Date(createdAt).toLocaleDateString()}
						</span>
					</div>
					<div className="tw-flex tw-items-center tw-mr-6 tw-mb-2">
						<CalendarIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-text-primary" />
						<span className="tw-font-medium tw-text-foreground">
							更新日: {new Date(updatedAt).toLocaleDateString()}
						</span>
					</div>
					<div className="tw-flex tw-items-center tw-mr-6 tw-mb-2">
						<UserIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-text-primary" />
						<span className="tw-font-medium tw-text-foreground">{author}</span>
					</div>
					<div className="tw-flex tw-items-center tw-flex-wrap tw-mt-2">
						<TagIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-mb-4 tw-text-primary" />
						{tags.map((tag: string) => (
							<span
								key={tag}
								className="tw-bg-primary tw-text-white tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-mr-2 tw-mb-4 tw-font-medium"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
				<div className="tw-mb-8 tw-rounded-lg tw-overflow-hidden tw-shadow-xl tw-max-w-2xl tw-mx-auto">
					<Image
						src={ogpImageUrl}
						alt={title}
						width={800}
						height={420}
						className="tw-w-full tw-h-auto"
					/>
				</div>
			</header>
			<div className="tw-prose tw-prose-lg tw-max-w-none">
				<MarkdownRenderer content={post.content.parent} />
			</div>
		</div>
	);
};

export default BlogContent;

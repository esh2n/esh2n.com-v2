import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Suspense, lazy, useMemo } from "react";
import type { PostResponseWithOGP } from "./BlogWrapper";

const MarkdownRenderer = dynamic(
	() => import("@/components/elements/MarkdownRenderer"),
	{
		loading: () => <p>Loading content...</p>,
	},
);

const BlogMeta = lazy(() => import("./BlogMeta"));

const BlogContent = ({ post }: { post: PostResponseWithOGP }) => {
	const { postInfo, ogpImageUrl } = post;

	const memoizedTags = useMemo(
		() =>
			postInfo.tags.map((tag: string) => (
				<span
					key={tag}
					className="tw-bg-primary tw-text-white tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-mr-2 tw-mb-4 tw-font-medium"
				>
					{tag}
				</span>
			)),
		[postInfo.tags],
	);

	return (
		<>
			<Head>
				<link rel="preload" href={ogpImageUrl} as="image" />
			</Head>
			<div className="tw-max-w-4xl tw-mx-auto tw-px-4 tw-py-8">
				<Suspense fallback={<div>Loading metadata...</div>}>
					<BlogMeta {...post.postInfo} renderedTags={memoizedTags} />
				</Suspense>
				<div className="tw-mb-8 tw-rounded-lg tw-overflow-hidden tw-shadow-xl tw-max-w-2xl tw-mx-auto">
					<Image
						src={ogpImageUrl}
						alt={postInfo.title}
						width={800}
						height={420}
						className="tw-w-full tw-h-auto"
						loading="lazy"
					/>
				</div>
				<div className="tw-prose tw-prose-lg tw-max-w-none">
					<MarkdownRenderer content={post.content.parent} />
				</div>
			</div>
		</>
	);
};

export default BlogContent;

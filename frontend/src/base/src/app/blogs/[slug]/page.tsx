import BlogWrapper from "@/components/layouts/Blog/BlogWrapper";
import { getPostStrMDContentBySlug } from "@/lib/bff";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const generateMetadata = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const post = await getPostStrMDContentBySlug(params.slug);
	const { title, tags, createdAt } = post.postInfo;
	const description = post.content.parent
		.replace(/[#*\[\]()_]/g, "")
		.slice(0, 100)
		.trim();
	const imageURL = "https://avatars.githubusercontent.com/u/55518345?v=4";
	const BASE_URL = process.env.NEXT_PUBLIC_BFF_URI;

	const ogpParams = new URLSearchParams({
		pageTitle: "esh2n.dev",
		title: title,
		date: new Date(createdAt).toLocaleDateString(),
		description,
		image: imageURL,
		tags: tags.join(","),
	});
	const ogpImageUrl = `${BASE_URL}api/ogp?${ogpParams.toString()}`;

	const formattedTitle = title.length > 25 ? `${title.slice(0, 25)}...` : title;

	return {
		title: formattedTitle,
		description,
		openGraph: {
			images: [
				{
					url: ogpImageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
		},
	};
};

const BlogPage = async ({ params }: { params: { slug: string } }) => {
	const post = await getPostStrMDContentBySlug(params.slug);
	const BASE_URL = process.env.NEXT_PUBLIC_BFF_URI;

	// OGP画像URLの生成を最適化
	const ogpParams = new URLSearchParams({
		pageTitle: "esh2n.dev",
		title: post.postInfo.title,
		date: formatDate(post.postInfo.createdAt),
		description: post.content.parent
			.replace(/[#*\[\]()_]/g, "")
			.slice(0, 100)
			.trim(),
		image: "https://avatars.githubusercontent.com/u/55518345?v=4",
		tags: post.postInfo.tags.join(","),
	});
	const ogpImageUrl = `${BASE_URL}api/ogp?${ogpParams.toString()}`;

	const formattedPost = {
		...post,
		postInfo: {
			...post.postInfo,
			createdAt: formatDate(post.postInfo.createdAt),
			updatedAt: formatDate(post.postInfo.updatedAt),
		},
		ogpImageUrl,
	};

	return <BlogWrapper post={formattedPost} />;
};

export default BlogPage;

import BlogWrapper from "@/components/layouts/Blog/BlogWrapper";
import { getPostStrMDContentBySlug } from "@/lib/bff";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;
export const generateMetadata = async ({
	params,
}: { params: { slug: string } }) => {
	const post = await getPostStrMDContentBySlug(params.slug);
	const { title, tags, createdAt } = post.postInfo;
	const description = post.content.parent
		.replace(/[#*\[\]()_]/g, "")
		.slice(0, 100)
		.trim();
	const imageURL = "https://avatars.githubusercontent.com/u/55518345?v=4";
	const data = `https://bff.esh2n.workers.dev/api/ogp?pageTitle=esh2n.dev&title=${encodeURIComponent(title)}&date=${new Date(createdAt).toLocaleDateString()}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(imageURL)}&tags=${tags}`;
	return {
		title: `${title} | esh2n.dev`,
		description,
		openGraph: {
			images: [
				{
					url: data,
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

	const formattedPost = {
		...post,
		postInfo: {
			...post.postInfo,
			createdAt: formatDate(post.postInfo.createdAt),
			updatedAt: formatDate(post.postInfo.updatedAt),
		},
		ogpImageUrl: `https://bff.esh2n.workers.dev/api/ogp?pageTitle=esh2n.dev&title=${encodeURIComponent(post.postInfo.title)}&date=${formatDate(post.postInfo.createdAt)}&description=${encodeURIComponent(
			post.content.parent
				.replace(/[#*\[\]()_]/g, "")
				.slice(0, 100)
				.trim(),
		)}&image=${encodeURIComponent("https://avatars.githubusercontent.com/u/55518345?v=4")}&tags=${post.postInfo.tags}`,
	};

	return <BlogWrapper post={formattedPost} />;
};

export default BlogPage;

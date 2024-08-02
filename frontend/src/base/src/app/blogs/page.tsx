import AnimatedWrapper from "@/components/elements/AnimatedWrapper";
import BlogCard from "@/components/elements/BlogCard";
import { getAllPosts } from "@/lib/bff";

export const revalidate = 60;

const Blogs = async () => {
	const posts = await getAllPosts();

	return (
		<AnimatedWrapper>
			<div className="tw-w-full tw-overflow-x-hidden">
				<section className="tw-py-16 tw-bg-background tw-text-foreground">
					<div className="tw-max-w-6xl tw-mx-auto tw-px-4">
						<h2 className="tw-text-4xl tw-font-semibold tw-mb-8 tw-text-primary">
							<span className="tw-mr-2">📚</span>Blogs.
						</h2>

						<div className="tw-grid tw-gap-8 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3">
							{posts.map((post) => (
								<BlogCard key={post.id} post={post} />
							))}
						</div>
					</div>
				</section>
			</div>
		</AnimatedWrapper>
	);
};

export default Blogs;

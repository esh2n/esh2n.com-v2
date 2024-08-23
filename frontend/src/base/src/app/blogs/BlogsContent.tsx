import AnimatedWrapper from "@/components/elements/AnimatedWrapper";
import BlogCard from "@/components/elements/BlogCard";
import type { Post } from "./page";

interface BlogsContentProps {
	posts: Post[];
	currentPage: number;
	totalPages: number;
	hasNextPage: boolean;
	goToPage: (page: number) => void;
	loading: boolean;
}

const BlogsContent = ({
	posts,
	currentPage,
	totalPages,
	hasNextPage,
	goToPage,
	loading,
}: BlogsContentProps) => {
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

						<div className="tw-mt-8 tw-flex tw-justify-center tw-items-center tw-space-x-4">
							<button
								type="button"
								onClick={() => goToPage(currentPage - 1)}
								disabled={currentPage === 1 || loading}
								className="tw-bg-primary tw-text-primary-foreground tw-px-4 tw-py-2 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-primary/80 disabled:tw-opacity-50"
							>
								Previous
							</button>
							<span>{`Page ${currentPage} of ${totalPages}`}</span>
							<button
								type="button"
								onClick={() => goToPage(currentPage + 1)}
								disabled={!hasNextPage || loading}
								className="tw-bg-primary tw-text-primary-foreground tw-px-4 tw-py-2 tw-rounded-md tw-font-semibold tw-transition-colors hover:tw-bg-primary/80 disabled:tw-opacity-50"
							>
								Next
							</button>
						</div>
					</div>
				</section>
			</div>
		</AnimatedWrapper>
	);
};

export default BlogsContent;

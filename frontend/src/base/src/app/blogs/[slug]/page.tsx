"use client";

import { getPostStrMDContentBySlug } from "@/lib/bff";

const Blog = async ({ params }: { params: { slug: string } }) => {
	const post = await getPostStrMDContentBySlug(params.slug);

	return (
		<div>
			<div className="py-10 px-5 lg:p-10 lg:px-20">
				<div className="prose" />
			</div>
		</div>
	);
};

export default Blog;

import CodeViewer from "@/components/elements/CodeViewer";
import type { PostResponse } from "@/types/post";
import "./style.scss";

const BlogCode = ({ post }: { post: PostResponse }) => {
	const { title, tags, author, emoji, createdAt, updatedAt } = post.postInfo;
	const { content } = post;
	const contentWithTitle = `# ${title}\n\n・ tags: [${tags.join(", ")}]\n・ author: ${author}\n・ emoji: ${emoji}\n・ createdAt: ${createdAt}\n・ updatedAt: ${updatedAt}\n${content.parent}`;
	const contentWithTitleWithoutLastNewline = contentWithTitle.trimEnd();
	const contentLines = contentWithTitleWithoutLastNewline.split("\n");

	return (
		<div className="blog-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={contentWithTitle} language="markdown" />
			</div>
		</div>
	);
};

export default BlogCode;

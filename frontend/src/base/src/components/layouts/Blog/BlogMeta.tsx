import { CalendarIcon, TagIcon, UserIcon } from "lucide-react";
import type { PostResponseWithOGP } from "./BlogWrapper";

const MetaItem = ({
	icon: Icon,
	text,
}: { icon: typeof CalendarIcon; text: string }) => (
	<div className="tw-flex tw-items-center tw-mr-6 tw-mb-2">
		<Icon className="tw-w-4 tw-h-4 tw-mr-2 tw-text-primary" />
		<span className="tw-font-medium tw-text-foreground">{text}</span>
	</div>
);

type BlogMetaProps = PostResponseWithOGP["postInfo"] & {
	renderedTags: JSX.Element[];
};

const BlogMeta: React.FC<BlogMetaProps> = ({
	title,
	author,
	createdAt,
	updatedAt,
	renderedTags,
	emoji,
}) => (
	<header className="tw-mb-8">
		<h1 className="tw-text-4xl tw-font-bold tw-mb-6 tw-text-primary">
			{emoji} {title}
		</h1>
		<div className="tw-flex tw-flex-wrap tw-items-center tw-text-sm tw-text-gray-600 tw-mb-6 tw-bg-gray-100 tw-rounded-lg tw-p-4">
			<MetaItem
				icon={CalendarIcon}
				text={`作成日: ${new Date(createdAt).toLocaleDateString()}`}
			/>
			<MetaItem
				icon={CalendarIcon}
				text={`更新日: ${new Date(updatedAt).toLocaleDateString()}`}
			/>
			<MetaItem icon={UserIcon} text={author} />
			<div className="tw-flex tw-items-center tw-flex-wrap tw-mt-2">
				<TagIcon className="tw-w-4 tw-h-4 tw-mr-2 tw-mb-4 tw-text-primary" />
				{renderedTags}
			</div>
		</div>
	</header>
);

export default BlogMeta;

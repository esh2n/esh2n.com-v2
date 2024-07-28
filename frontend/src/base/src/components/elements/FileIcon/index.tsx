import { getFileIconInfo } from "@/lib/utils";
import { BookOpenText, Settings } from "lucide-react";

type FileIconProps = {
	filename: string;
	className?: string;
};

const StrokeColoredIcon = ({
	icon: Icon,
	color,
}: {
	icon: React.ComponentType<{ stroke?: string }>;
	color: string;
}) => {
	return <Icon stroke={color} />;
};

const FilledColoredIcon = ({
	icon: Icon,
	color,
	isFilled = true,
}: {
	icon: React.ComponentType;
	color: string;
	isFilled?: boolean;
}) => {
	return (
		<span className={`${isFilled ? "colored-icon" : ""}`} style={{ color }}>
			<Icon />
		</span>
	);
};

const FileIcon: React.FC<FileIconProps> = ({ filename, className = "" }) => {
	const {
		icon: IconComponent,
		color,
		isStrokeIcon,
		isFilled = true,
	} = getFileIconInfo(filename);

	if (IconComponent === BookOpenText || IconComponent === Settings) {
		return <StrokeColoredIcon icon={IconComponent} color={color} />;
	}

	// react-iconsの処理
	return (
		<FilledColoredIcon
			icon={IconComponent}
			color={color}
			isFilled={!isStrokeIcon && isFilled}
		/>
	);
};

export { FileIcon, StrokeColoredIcon, FilledColoredIcon };

"use client";
import { ChevronDown, ChevronRight, GitBranch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

import { FaFolderClosed, FaFolderOpen } from "react-icons/fa6";

import FileIcon from "@/components/elements/FileIcon";
import TipMeModal from "@/components/elements/TipMe";
import useResizable from "@/hooks/resize";
import { getFileNameWithExtension } from "@/lib/utils";

import "./style.scss";

// Lucide-react用のカスタムアイコンコンポーネント
const StrokeColoredIcon = ({
	icon: Icon,
	color,
}: { icon: React.ComponentType<{ stroke?: string }>; color: string }) => {
	return <Icon stroke={color} />;
};

// react-icons用のカスタムアイコンコンポーネント
const FilledColoredIcon = ({
	icon: Icon,
	color,
	isFilled = true,
}: { icon: React.ComponentType; color: string; isFilled?: boolean }) => {
	return (
		<span className={`${isFilled ? "colored-icon" : ""}`} style={{ color }}>
			<Icon />
		</span>
	);
};

const SidebarSection = ({
	title,
	iconClose: IconClose,
	iconOpen: IconOpen,
	className,
	children,
}: Readonly<{
	title: string;
	iconClose: React.ComponentType;
	iconOpen: React.ComponentType;
	children: ReactNode;
	className?: string;
}>) => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className="tw-mb-2">
			<div
				className="tw-flex tw-items-center tw-cursor-pointer tw-text-sm"
				onClick={() => setIsOpen(!isOpen)}
				onKeyUp={(e) => e.key === "Enter" && setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<ChevronDown className="icon-size" />
				) : (
					<ChevronRight className="icon-size" />
				)}
				<span
					className={`tw-pl-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis ${className}`}
				>
					<FilledColoredIcon
						icon={isOpen ? IconOpen : IconClose}
						color="#E8A87C"
					/>
				</span>
				<span className="tw-pl-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
					{title}
				</span>
			</div>
			{isOpen && <div className="tw-pl-4">{children}</div>}
		</div>
	);
};

const SidebarItem = ({
	href,
	isCurrentPage = false,
}: Readonly<{
	href: string;
	isCurrentPage?: boolean;
}>) => {
	const fileName = getFileNameWithExtension(href);

	return (
		<Link href={href} className="tw-no-underline tw-text-inherit">
			<div
				className={`tw-flex tw-items-center tw-p-1 tw-ml-2 tw-cursor-pointer tw-text-sm ${isCurrentPage ? "highlight-bg" : ""}`}
			>
				<FileIcon filename={fileName} />
				<span className="tw-pl-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
					{fileName}
				</span>
			</div>
		</Link>
	);
};
const VSCodeSidebar = () => {
	const { width, elementRef } = useResizable({
		initialWidth: 256,
		minWidth: 200,
		maxWidth: 600,
		position: "right",
	});

	const pathname = usePathname();

	return (
		<div
			ref={elementRef}
			className="tw-relative"
			style={{ width: `${width}px` }}
		>
			<div className="vscode-sidebar tw-p-2 tw-h-[calc(100vh-4rem)] tw-overflow-y-auto tw-flex tw-flex-col tw-justify-between tw-text-xs">
				<div>
					<SidebarItem href="/" isCurrentPage={pathname === "/"} />
					<SidebarSection
						title="pages"
						iconClose={FaFolderClosed}
						iconOpen={FaFolderOpen}
						className="folder-icon"
					>
						<SidebarItem href="/blogs" isCurrentPage={pathname === "/blogs"} />
						<SidebarItem
							href="/contact"
							isCurrentPage={pathname === "/contact"}
						/>
						<SidebarItem href="/about" isCurrentPage={pathname === "/about"} />
					</SidebarSection>
					<SidebarSection
						title="changelogs"
						iconClose={GitBranch}
						iconOpen={GitBranch}
						className="branch-icon"
					>
						<SidebarItem
							href="/changelog/20240713"
							isCurrentPage={pathname === "/changelog/20240713"}
						/>
					</SidebarSection>
					<SidebarItem
						href="/settings"
						isCurrentPage={pathname === "/settings"}
					/>
				</div>
				<TipMeModal />
			</div>
			<div className="resizer tw-absolute tw-top-0 tw-right-0 tw-w-1 tw-h-full tw-cursor-col-resize hover:tw-bg-gray-300" />
		</div>
	);
};

export default VSCodeSidebar;

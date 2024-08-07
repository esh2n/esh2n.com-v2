"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
	FaFolderClosed,
	FaFolderOpen,
	FaGithub,
	FaLinkedin,
	FaXTwitter,
} from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { SiZenn } from "react-icons/si";

import { FileIcon, FilledColoredIcon } from "@/components/elements/FileIcon";
import TipMeModal from "@/components/elements/TipMe";
import useResizable from "@/hooks/resize";
import { getFileNameWithExtension } from "@/lib/utils";

import "./style.scss";

const CombinedSidebar = () => {
	const { width, handleMouseDown, setWidth } = useResizable({
		initialWidth: 200,
		minWidth: 200,
		maxWidth: 600,
		position: "right",
	});

	const pathname = usePathname();
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const checkIsMobile = useCallback(() => {
		const mobile = window.innerWidth < 768;
		if (mobile !== isMobile) {
			setIsMobile(mobile);
			if (mobile) {
				setIsOpen(false);
			} else {
				setIsOpen(true);
				setWidth(200); // Reset to default width when switching to desktop
			}
		}
	}, [isMobile, setWidth]);

	useEffect(() => {
		checkIsMobile();
		window.addEventListener("resize", checkIsMobile);
		return () => window.removeEventListener("resize", checkIsMobile);
	}, [checkIsMobile]);

	const toggleSidebar = () => setIsOpen(!isOpen);

	const handleLinkClick = (href: string) => {
		router.push(href);
		if (isMobile) {
			setIsOpen(false);
		}
	};

	const iconLinks = [
		{ id: "github", Icon: FaGithub, href: "https://github.com/esh2n" },
		{ id: "twitter", Icon: FaXTwitter, href: "https://x.com/esh2n" },
		{
			id: "linkedin",
			Icon: FaLinkedin,
			href: "https://www.linkedin.com/in/esh2n/",
		},
		{ id: "mail", Icon: IoMailOutline, href: "mailto:example@example.com" },
		{ id: "zenn", Icon: SiZenn, href: "https://zenn.dev/esh2n" },
	];

	const sidebarContent = (
		<div
			className="combined-sidebar tw-p-2 tw-h-full tw-overflow-y-auto tw-flex tw-flex-col tw-justify-between tw-text-xs"
			onClick={(e) => e.stopPropagation()}
			onKeyDown={(e) => e.key === "Enter" && e.stopPropagation()}
			role="presentation"
		>
			<div>
				<SidebarItem
					href="/"
					isCurrentPage={pathname === "/"}
					onClick={() => handleLinkClick("/")}
				/>
				<SidebarSection
					title="pages"
					iconClose={FaFolderClosed}
					iconOpen={FaFolderOpen}
					className="folder-icon"
				>
					<SidebarItem
						href="/blogs"
						isCurrentPage={pathname === "/blogs"}
						onClick={() => handleLinkClick("/blogs")}
					/>
					<SidebarItem
						href="/contact"
						isCurrentPage={pathname === "/contact"}
						onClick={() => handleLinkClick("/contact")}
					/>
					<SidebarItem
						href="/about"
						isCurrentPage={pathname === "/about"}
						onClick={() => handleLinkClick("/about")}
					/>
					<SidebarItem
						href="/resume"
						isCurrentPage={pathname === "/resume"}
						onClick={() => handleLinkClick("/resume")}
					/>
					<SidebarItem
						href="/readme"
						isCurrentPage={pathname === "/readme"}
						onClick={() => handleLinkClick("/readme")}
					/>
				</SidebarSection>
				<SidebarItem
					href="/settings"
					isCurrentPage={pathname === "/settings"}
					onClick={() => handleLinkClick("/settings")}
				/>

				{isMobile && (
					<div className="tw-mt-4">
						<h3 className="tw-text-sm tw-font-bold tw-mb-2">Links</h3>
						<div className="tw-flex tw-flex-wrap tw-gap-2">
							{iconLinks.map(({ id, Icon, href }) => (
								<Link
									key={id}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="tw-p-2 tw-bg-gray-700 tw-rounded"
								>
									<Icon className="tw-w-5 tw-h-5" />
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
			<TipMeModal />
		</div>
	);

	return (
		<>
			<AnimatePresence>
				{isMobile && (
					<motion.button
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						className="tw-fixed tw-top-3 tw-right-3 tw-z-50 tw-p-2 tw-bg-primary tw-rounded-full tw-shadow-lg tw-flex tw-items-center tw-justify-center"
						onClick={toggleSidebar}
						aria-label="Toggle menu"
					>
						<AnimatePresence mode="wait">
							{isOpen ? (
								<motion.div
									key="close"
									initial={{ rotate: -180 }}
									animate={{ rotate: 0 }}
									exit={{ rotate: 180 }}
									transition={{ duration: 0.3 }}
								>
									<X className="tw-text-primary-foreground tw-w-6 tw-h-6" />
								</motion.div>
							) : (
								<motion.div
									key="menu"
									initial={{ rotate: 180 }}
									animate={{ rotate: 0 }}
									exit={{ rotate: -180 }}
									transition={{ duration: 0.3 }}
								>
									<Menu className="tw-text-primary-foreground tw-w-6 tw-h-6" />
								</motion.div>
							)}
						</AnimatePresence>
					</motion.button>
				)}
			</AnimatePresence>
			<motion.div
				className={`tw-h-full ${
					isMobile
						? "tw-fixed tw-top-0 tw-left-0 tw-bottom-0 tw-z-40"
						: "tw-relative tw-flex"
				}`}
				initial={false}
				animate={{
					x: isMobile && !isOpen ? "-100%" : 0,
					width: isMobile ? 300 : width,
					opacity: isOpen || !isMobile ? 1 : 0,
				}}
				transition={{ type: "spring", stiffness: 300, damping: 30 }}
				style={{
					boxShadow: isMobile ? "0 0 10px rgba(0,0,0,0.1)" : "none",
				}}
			>
				<div className="tw-flex-grow tw-overflow-hidden">{sidebarContent}</div>
				{!isMobile && (
					<div
						onMouseDown={handleMouseDown}
						className="tw-w-1 tw-h-full tw-cursor-col-resize hover:tw-bg-gray-300"
					/>
				)}
			</motion.div>
			{isMobile && isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-z-30"
					onClick={toggleSidebar}
				/>
			)}
		</>
	);
};

const SidebarItem = ({
	href,
	isCurrentPage = false,
	children,
	onClick,
}: Readonly<{
	href: string;
	isCurrentPage?: boolean;
	children?: ReactNode;
	onClick: () => void;
}>) => {
	const fileName = getFileNameWithExtension(href);

	return (
		<div
			onClick={onClick}
			onKeyDown={(e) => e.key === "Enter" && onClick()}
			className={`tw-flex tw-items-center tw-p-1 tw-ml-2 tw-cursor-pointer tw-text-sm ${
				isCurrentPage ? "highlight-bg" : ""
			}`}
			role="button"
			tabIndex={0}
		>
			<FileIcon filename={fileName} />
			<span className="tw-pl-1 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis">
				{children || fileName}
			</span>
		</div>
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

export default CombinedSidebar;

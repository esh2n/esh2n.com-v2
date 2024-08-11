"use client";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import { getAllPosts } from "@/lib/bff";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
	Book,
	FileText,
	History,
	Mail,
	Search,
	Settings,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

interface PageItem {
	name: string;
	path: string;
	icon: JSX.Element;
	shortcut?: string;
}

export default function SearchBar() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [pages, setPages] = useState<PageItem[]>([]);
	const [blogs, setBlogs] = useState<PageItem[]>([]);
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 768);
		};

		checkScreenSize();
		window.addEventListener("resize", checkScreenSize);

		return () => window.removeEventListener("resize", checkScreenSize);
	}, []);

	const fetchPages = useCallback(async () => {
		const sidebarPages: PageItem[] = [
			{
				name: "About me",
				path: "/about",
				icon: <User className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "A",
			},
			{
				name: "Readme",
				path: "/readme",
				icon: <FileText className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "R",
			},
			{
				name: "Resume",
				path: "/resume",
				icon: <History className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "E",
			},
			{
				name: "Contact",
				path: "/contact",
				icon: <Mail className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "C",
			},
			{
				name: "Blog",
				path: "/blogs",
				icon: <Book className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "B",
			},
			{
				name: "Settings",
				path: "/settings",
				icon: <Settings className="tw-mr-2 tw-h-4 tw-w-4" />,
				shortcut: "S",
			},
		];
		11;

		setPages(sidebarPages);

		try {
			console.log("Fetching blog posts...");
			const res = await getAllPosts(5, "");
			const { posts } = res.posts;
			const blogPages: PageItem[] = posts.map((post) => ({
				name:
					post.title.length > 25 ? `${post.title.slice(0, 25)}...` : post.title,
				path: `/blogs/${post.slug}`,
				icon: <FileText className="tw-mr-2 tw-h-4 tw-w-4" />,
			}));
			setBlogs(blogPages);
			setError(null);
		} catch (err) {
			console.error("Error fetching blog posts:", err);
			setError(`Failed to fetch blog posts: ${err}`);
		}
	}, []);

	useEffect(() => {
		fetchPages();
	}, [fetchPages]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				type="button"
				className={`tw-flex tw-items-center tw-justify-between tw-bg-background tw-text-foreground tw-rounded-md tw-border tw-border-input tw-px-3 tw-py-2 tw-text-sm tw-font-normal ${
					isSmallScreen ? "tw-w-30" : "tw-w-64"
				}`}
			>
				<div className="tw-flex tw-items-center">
					<Search className="tw-mr-2 tw-h-4 tw-w-4" />
					<span>{isSmallScreen ? "Search" : "Search pages..."}</span>
				</div>
				{!isSmallScreen && (
					<kbd className="tw-pointer-events-none tw-inline-flex tw-h-5 tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground tw-opacity-100">
						<span className="tw-text-xs">⌘</span>J
					</kbd>
				)}
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<DialogTitle asChild>
					<VisuallyHidden>Search pages and blog posts</VisuallyHidden>
				</DialogTitle>
				<div
					className="tw-flex tw-items-center tw-border-b tw-px-3 tw-bg-background"
					cmdk-input-wrapper=""
				>
					<CommandInput
						placeholder="Type a command or search..."
						className="tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none tw-placeholder:tw-text-muted-foreground tw-disabled:tw-cursor-not-allowed tw-disabled:tw-opacity-50"
					/>
				</div>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{error && <div className="tw-text-red-500 tw-p-2">{error}</div>}
					<CommandGroup heading="Pages">
						{pages.map((page) => (
							<CommandItem
								key={page.path}
								onSelect={() => runCommand(() => router.push(page.path))}
								onMouseEnter={() => setHoveredItem(page.path)}
								onMouseLeave={() => setHoveredItem(null)}
								className={`tw-cursor-pointer ${hoveredItem === page.path ? "tw-bg-accent tw-text-accent-foreground" : ""}`}
							>
								{page.icon}
								<span className="tw-ml-2">{page.name}</span>
								<kbd className="tw-ml-auto tw-pointer-events-none tw-inline-flex tw-h-5 tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground">
									{page.shortcut
										? page.shortcut
										: page.name.charAt(0).toUpperCase()}
								</kbd>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Recent Blog Posts">
						{blogs.map((blog, index) => (
							<CommandItem
								key={blog.path}
								onSelect={() => runCommand(() => router.push(blog.path))}
								onMouseEnter={() => setHoveredItem(blog.path)}
								onMouseLeave={() => setHoveredItem(null)}
								className={`tw-cursor-pointer ${hoveredItem === blog.path ? "tw-bg-accent tw-text-accent-foreground" : ""}`}
							>
								{blog.icon}
								<span className="tw-ml-2">{blog.name}</span>
								<kbd className="tw-ml-auto tw-pointer-events-none tw-inline-flex tw-h-5 tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground">
									{(index + 1).toString()}
								</kbd>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
}

interface VisuallyHiddenProps {
	children: ReactNode;
}

const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
	return (
		<span
			style={{
				border: 0,
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: 0,
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal",
			}}
		>
			{children}
		</span>
	);
};

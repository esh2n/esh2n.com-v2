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
import * as React from "react";

interface PageItem {
	name: string;
	path: string;
	icon: JSX.Element;
	shortcut?: string;
}

export default function SearchBar() {
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [pages, setPages] = React.useState<PageItem[]>([]);
	const [blogs, setBlogs] = React.useState<PageItem[]>([]);
	const [hoveredItem, setHoveredItem] = React.useState<string | null>(null);

	React.useEffect(() => {
		const fetchPages = async () => {
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

			// const posts = await getAllPosts(); // TODO: 最新の5件を取得

			// const blogPages: PageItem[] = [];
			// for (const post of posts) {
			// 	blogPages.push({
			// 		name: post.title,
			// 		path: `/blog/${post.slug}`,
			// 		icon: <FileText className="tw-mr-2 tw-h-4 tw-w-4" />,
			// 	});
			// }

			setPages(sidebarPages);
			// setBlogs(blogPages);
		};

		fetchPages();
	}, []);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const runCommand = React.useCallback((command: () => unknown) => {
		setOpen(false);
		command();
	}, []);

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				type="button"
				className="tw-flex tw-items-center tw-justify-between tw-w-64 tw-bg-background tw-text-foreground tw-rounded-md tw-border tw-border-input tw-px-3 tw-py-2 tw-text-sm tw-font-normal"
			>
				<div className="tw-flex tw-items-center">
					<Search className="tw-mr-2 tw-h-4 tw-w-4" />
					<span>Search pages...</span>
				</div>
				<kbd className="tw-pointer-events-none tw-inline-flex tw-h-5 tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground tw-opacity-100">
					<span className="tw-text-xs">⌘</span>J
				</kbd>
			</button>
			<CommandDialog open={open} onOpenChange={setOpen}>
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
					{/* <CommandSeparator />
					<CommandGroup heading="Blog Posts">
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
					<CommandSeparator /> */}
					{/* TODO: Add actions */}
					{/* <CommandGroup heading="Actions">
						<CommandItem
							onSelect={() => runCommand(() => router.push("/search"))}
							onMouseEnter={() => setHoveredItem("search")}
							onMouseLeave={() => setHoveredItem(null)}
							className={`tw-cursor-pointer ${hoveredItem === "search" ? "tw-bg-accent tw-text-accent-foreground" : ""}`}
						>
							<Search className="tw-mr-2 tw-h-4 tw-w-4" />
							<span>Search</span>
							<kbd className="tw-ml-auto tw-pointer-events-none tw-inline-flex tw-h-5 tw-select-none tw-items-center tw-gap-1 tw-rounded tw-border tw-bg-muted tw-px-1.5 tw-font-mono tw-text-[10px] tw-font-medium tw-text-muted-foreground">
								S
							</kbd>
						</CommandItem>
					</CommandGroup> */}
				</CommandList>
			</CommandDialog>
		</>
	);
}

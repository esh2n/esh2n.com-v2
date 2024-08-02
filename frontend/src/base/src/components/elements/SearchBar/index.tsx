"use client";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { Book, History, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

export default function SearchBar() {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);
	const [inputText, setInputText] = useState("");
	const [selected, setSelected] = useState<string>();
	const [searchResults, setSearchResults] = useState<string[]>([]);
	const [hoveredItem, setHoveredItem] = useState<string | null>(null);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === "Escape") {
					input.blur();
				}
			}
		},
		[],
	);

	useEffect(() => {
		// Call API
		setSearchResults(["test"]);
		console.log(inputText);
	}, [inputText]);

	const handleItemHover = (item: string) => {
		setHoveredItem(item);
	};

	const handleItemLeave = () => {
		setHoveredItem(null);
	};

	const handleItemSelect = (item: string, path: string) => {
		setSelected(item);
		setInputText(item);
		setOpen(false);
		router.push(path);
	};

	const pageItems = [
		{
			name: "About me",
			path: "/about",
			icon: <User className="tw-mr-2 tw-h-4 tw-w-4" />,
		},
		{
			name: "Blogs",
			path: "/blogs",
			icon: <Book className="tw-mr-2 tw-h-4 tw-w-4" />,
		},
		{
			name: "Resume",
			path: "/resume",
			icon: <History className="tw-mr-2 tw-h-4 tw-w-4" />,
		},
	];

	return (
		<div className="tw-relative tw-w-full tw-max-w-[600px]">
			<Command
				className="command tw-rounded-l tw-w-full"
				shouldFilter={false}
				value={selected}
				onKeyDown={handleKeyDown}
			>
				<CommandInput
					ref={inputRef}
					className="command-input tw-w-full"
					placeholder="Type a command or search..."
					value={inputText}
					onValueChange={(text) => {
						setInputText(text);
						if (selected) {
							setSelected(undefined);
						}
					}}
					onBlur={() => {
						setOpen(false);
					}}
					onFocus={() => {
						setOpen(true);
						inputRef.current?.select();
					}}
				/>
				{open && (
					<div className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-mt-1 tw-w-full">
						<div className="command-list tw-bg-background tw-rounded-md tw-shadow-lg tw-w-full tw-border tw-border-border">
							<CommandList>
								<CommandEmpty>No results found.</CommandEmpty>
								{searchResults?.length > 0 && (
									<CommandGroup heading="Suggestions">
										{searchResults?.map((v, i) => (
											<CommandItem
												key={v}
												onSelect={() =>
													handleItemSelect(
														v,
														`/search?q=${encodeURIComponent(v)}`,
													)
												}
												onMouseEnter={() => handleItemHover(v)}
												onMouseLeave={handleItemLeave}
												className={`tw-cursor-pointer ${
													hoveredItem === v
														? "tw-bg-accent tw-text-accent-foreground"
														: ""
												}`}
											>
												<Book className="tw-mr-2 tw-h-4 tw-w-4" />
												<span>{v}</span>
												<CommandShortcut>⌘{i}</CommandShortcut>
											</CommandItem>
										))}
									</CommandGroup>
								)}
								<CommandSeparator />
								<CommandGroup heading="Pages">
									{pageItems.map((item, index) => (
										<CommandItem
											key={item.name}
											onSelect={() => handleItemSelect(item.name, item.path)}
											onMouseEnter={() => handleItemHover(item.name)}
											onMouseLeave={handleItemLeave}
											className={`tw-cursor-pointer ${
												hoveredItem === item.name
													? "tw-bg-accent tw-text-accent-foreground"
													: ""
											}`}
										>
											{item.icon}
											<span>{item.name}</span>
											<CommandShortcut>
												⌘{String.fromCharCode(65 + index)}
											</CommandShortcut>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</div>
					</div>
				)}
			</Command>
		</div>
	);
}

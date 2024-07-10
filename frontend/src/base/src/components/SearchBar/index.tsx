"use client";

import {
	Book,
	Calculator,
	Calendar,
	History,
	Settings,
	Smile,
	User,
} from "lucide-react";

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
import { useCallback, useEffect, useRef, useState } from "react";
import "./style.scss";

export default function SearchBar() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);
	const [inputText, setInputText] = useState("");
	const [selected, setSelected] = useState<string>();
	const [searchResults, setSearchResults] = useState<string[]>([]);

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

	return (
		<Command
			className="command tw-rounded-l "
			shouldFilter={false}
			value={selected}
			onKeyDown={handleKeyDown}
		>
			<CommandInput
				className="command-input"
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
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{searchResults?.length > 0 && (
						<CommandGroup heading="Suggestions">
							{searchResults?.map((v, i) => (
								<CommandItem
									onSelect={() => {
										setSelected(v);
										setInputText(v);
									}}
									value={v}
									key={v}
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
						<CommandItem>
							<User className="tw-mr-2 tw-h-4 tw-w-4" />
							<span>About me</span>
							<CommandShortcut>⌘A</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Book className="tw-mr-2 tw-h-4 tw-w-4" />
							<span>Blogs</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<History className="tw-mr-2 tw-h-4 tw-w-4" />
							<span>Resume</span>
							<CommandShortcut>⌘B</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			)}
		</Command>
	);
}

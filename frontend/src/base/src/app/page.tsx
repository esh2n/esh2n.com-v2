import AIChat from "@/components/AIChat";
import SearchBar from "@/components/SearchBar";

export default function Home() {
	return (
		<main className="tw-flex tw-min-h-screen tw-flex-col tw-items-center tw-justify-between">
			<div className="tw-w-full tw-max-w-[500px]">
				<SearchBar />
				<AIChat />
			</div>
		</main>
	);
}

import SearchBar from "@/components/elements/SearchBar";
import ThemeSwitcher from "@/components/elements/ThemeSwicther";

import "./style.scss";
export default function Header() {
	return (
		<div className="header tw-flex tw-items-center tw-justify-center tw-container tw-w-full tw-pt-2 tw-pb-2">
			<SearchBar />
			<div className="tw-w-4" />
			<ThemeSwitcher />
		</div>
	);
}

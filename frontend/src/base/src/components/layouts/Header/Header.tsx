import SearchBar from "@/components/elements/SearchBar";
import ThemeSwitcher from "@/components/elements/ThemeSwicther";

import "./style.scss";
import Link from "next/link";
import { ResponsiveLogo } from "./ResponsiveLogo";

export default function Header() {
	return (
		<header className="header tw-flex tw-items-center tw-justify-between tw-container tw-w-full tw-py-2 tw-px-4">
			<div className="tw-flex tw-items-center">
				<ResponsiveLogo />
			</div>
			<div className="tw-flex tw-items-center tw-flex-grow tw-justify-center tw-mx-4">
				<SearchBar />
				<div className="tw-ml-2">
					<ThemeSwitcher />
				</div>
			</div>
			<div className="tw-w-[50px]" />
		</header>
	);
}

import { Home, Settings } from "lucide-react";
import React from "react";
import {
	FaGithub,
	FaHouse,
	FaHouseMedical,
	FaLinkedin,
	FaXTwitter,
} from "react-icons/fa6";
import { IoMailOutline } from "react-icons/io5";
import { SiZenn } from "react-icons/si";

import "./style.scss";
import Link from "next/link";

const Sidebar = () => {
	const topIcons = [
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

	return (
		<div className="icon-sidebar tw-flex tw-flex-col tw-justify-between tw-items-center tw-w-16 tw-h-[calc(100vh-4rem)]">
			<div className="tw-flex tw-flex-col tw-items-center tw-pt-4">
				<Link href="/">
					<FaHouse className="tw-w-6 tw-h-6" />
				</Link>
				<div className="tw-flex tw-flex-col tw-items-center tw-pt-4">
					{topIcons.map(({ id, Icon, href }) => (
						<Link
							key={id}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="tw-p-3"
						>
							<Icon className="tw-w-6 tw-h-6" />
						</Link>
					))}
				</div>
			</div>
			<div className="tw-pb-4">
				<button type="button" className="tw-p-3">
					<Link href="/settings">
						<Settings className="tw-w-6 tw-h-6" />
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Sidebar;

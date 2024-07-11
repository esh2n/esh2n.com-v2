"use client";

import { useEffect } from "react";
import "./style.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function AIChat() {
	useEffect(() => {
		import("@esh2n.com/ui");
	});

	return (
		<div className="tw-max-w-[600px] tw-h-full">
			<ai-chat
				headerTxt="もしかしてこのサイト、ターミナルが出せる...?"
				inputPlaceholder="得意な言語は？"
			/>
		</div>
	);
}

"use client";

import "./style.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { aiChatOpenState, aiChatWidthState } from "@/atoms/aichat";
import useResizable from "@/hooks/resize";
import dynamic from "next/dynamic";
import { useRecoilState, useRecoilValue } from "recoil";
import type { AIChatComponent } from "./utils";

const LitAIChat = dynamic<React.ComponentProps<typeof AIChatComponent>>(
	() => import("./utils").then(({ AIChatComponent }) => AIChatComponent),
	{
		ssr: false,
	},
);

export default function AIChat() {
	const [width, setWidth] = useRecoilState(aiChatWidthState);
	const isOpen = useRecoilValue(aiChatOpenState);

	const { elementRef } = useResizable({
		initialWidth: width,
		minWidth: 700,
		maxWidth: 1000,
		position: "left",
		onResize: setWidth,
	});

	return (
		isOpen && (
			<div
				ref={elementRef}
				className="tw-relative tw-h-full tw-overflow-auto"
				style={{ width: `${width}px` }}
			>
				<LitAIChat
					headerTxt="もしかしてこのサイト、ターミナルが出せる...?"
					inputPlaceholder="得意な言語は？"
				/>
				<div className="resizer tw-absolute tw-top-0 tw-left-0 tw-w-1 tw-h-full tw-cursor-col-resize hover:tw-bg-gray-300" />
			</div>
		)
	);
}

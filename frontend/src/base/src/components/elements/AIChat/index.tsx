"use client";

import { aiChatOpenState, aiChatWidthState } from "@/atoms/aichat";
import useResizable from "@/hooks/resize";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import "./style.scss";

import { Bot, MessageCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import type { AIChatReact as AIChatReactType, Message } from "./util";

const AIChatComponent = dynamic<React.ComponentProps<typeof AIChatReactType>>(
	() =>
		import("./util").then(({ AIChatReact }) => {
			return AIChatReact;
		}),
	{
		ssr: false,
	},
);

const API_KEY = process.env.NEXT_PUBLIC_DIFY_API_KEY || "";
const DIFY_URL = process.env.NEXT_PUBLIC_DIFY_URL || "";

async function sendMessageToDify(message: string) {
	const response = await fetch(`${DIFY_URL}/v1/chat-messages`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${API_KEY}`,
		},
		body: JSON.stringify({
			inputs: {},
			query: message,
			response_mode: "streaming",
			conversation_id: "",
			user: `user-${Date.now()}`,
		}),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return response.body?.getReader();
}

async function processStream(
	reader: ReadableStreamDefaultReader<Uint8Array>,
	callback: (text: string) => void,
) {
	const decoder = new TextDecoder();
	let buffer = "";

	while (true) {
		const { done, value } = await reader.read();
		if (done) break;

		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split("\n");
		buffer = lines.pop() || "";

		for (const line of lines) {
			if (line.startsWith("data: ")) {
				try {
					const data = JSON.parse(line.slice(6));
					if (data.event === "message" && data.answer) {
						callback(data.answer);
					}
				} catch (error) {
					console.error("Error parsing JSON:", error);
				}
			}
		}
	}
}

const AIChatWrapper: React.FC = () => {
	const [width, setWidth] = useRecoilState(aiChatWidthState);
	const [isOpen, setIsOpen] = useRecoilState(aiChatOpenState);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isClient, setIsClient] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const handleMessageSent = useCallback(async (e: CustomEvent) => {
		const message = e.detail.message;

		// Add user message
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: Date.now(), text: message, sender: "user" },
		]);

		try {
			const reader = await sendMessageToDify(message);
			if (reader) {
				let aiResponse = "";
				await processStream(reader, (text) => {
					aiResponse += text;
					setMessages((prevMessages) => {
						const newMessages = [...prevMessages];
						const lastMessage = newMessages[newMessages.length - 1];
						if (lastMessage && lastMessage.sender === "ai") {
							lastMessage.text = aiResponse;
						} else {
							newMessages.push({
								id: Date.now(),
								text: aiResponse,
								sender: "ai",
							});
						}
						return newMessages;
					});
				});
			}
		} catch (error) {
			console.error("Error sending message to Dify:", error);
			setMessages((prevMessages) => [
				...prevMessages,
				{
					id: Date.now(),
					text: "申し訳ありません。エラーが発生しました。",
					sender: "ai",
				},
			]);
		}
	}, []);

	const updateLastAIMessage = useCallback((text: string) => {
		setMessages((prevMessages) => {
			const newMessages = [...prevMessages];
			const lastMessage = newMessages[newMessages.length - 1];
			if (lastMessage && lastMessage.sender === "ai") {
				lastMessage.text = text;
			} else {
				newMessages.push({ id: Date.now(), text, sender: "ai" });
			}
			return newMessages;
		});
	}, []);

	if (!isClient) {
		return null;
	}

	const toggleChat = () => {
		setIsOpen(!isOpen);
	};
	return (
		<>
			{isMobile ? (
				<>
					<button
						type="button"
						onClick={toggleChat}
						className="tw-fixed tw-bottom-4 tw-right-4 tw-z-50 tw-bg-primary tw-text-primary-foreground tw-rounded-full tw-shadow-lg tw-flex tw-items-center tw-justify-center tw-px-4 tw-py-3 tw-transition-all tw-duration-300 tw-ease-in-out"
					>
						<Bot size={24} className="tw-text-primary-foreground tw-mr-2" />
						<span className="tw-font-medium tw-whitespace-nowrap">
							Chat with AI
						</span>
						<span className="tw-absolute tw-top-0 tw-right-0 tw-w-3 tw-h-3 tw-bg-green-500 tw-rounded-full tw-animate-pulse" />
					</button>
					{isOpen && (
						<div className="tw-fixed tw-inset-0 tw-z-50 tw-bg-background tw-overflow-auto">
							<div className="tw-relative tw-h-full">
								<button
									type="button"
									onClick={toggleChat}
									className="tw-absolute tw-top-4 tw-right-4 tw-z-10 tw-bg-secondary tw-text-secondary-foreground tw-rounded-full tw-p-2 tw-transition-colors tw-duration-200 hover:tw-bg-secondary-hover"
								>
									<X size={24} />
								</button>
								<AIChatComponent
									messages={messages}
									onMessageSent={handleMessageSent}
									updateLastAIMessage={updateLastAIMessage}
									headerTxt="このサイト、ターミナルが出せる...?"
									inputPlaceholder="得意な言語は？"
								/>
							</div>
						</div>
					)}
				</>
			) : (
				isOpen && (
					<div
						className="tw-relative tw-h-full tw-overflow-auto"
						style={{ width: `${width}px` }}
					>
						<AIChatComponent
							messages={messages}
							onMessageSent={handleMessageSent}
							updateLastAIMessage={updateLastAIMessage}
							headerTxt="このサイト、ターミナルが出せる...?"
							inputPlaceholder="得意な言語は？"
						/>
					</div>
				)
			)}
		</>
	);
};

export default AIChatWrapper;

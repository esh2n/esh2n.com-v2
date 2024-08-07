"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
	SiNextdotjs,
	SiNotion,
	SiTurborepo,
	SiWebassembly,
} from "react-icons/si";
import "./style.scss";

const ReadmePage: React.FC = () => {
	const techStack = [
		{
			name: "Next.js",
			icon: <SiNextdotjs />,
			description: "フロントエンドフレームワーク",
		},
		{ name: "Shiki", icon: "🎨", description: "シンタックスハイライト" },
		{ name: "Lit Element", icon: "💻", description: "Web Componentsの作成" },
		{ name: "TurboRepo", icon: <SiTurborepo />, description: "モノレポ管理" },
		{
			name: "Notion API",
			icon: <SiNotion />,
			description: "ブログコンテンツ管理",
		},
		{ name: "Hono", icon: "🔗", description: "OGPとNotion APIの連携（BFF）" },
		{
			name: "WebAssembly (Rust)",
			icon: <SiWebassembly />,
			description: "Markdown to HTML パース",
		},
		{ name: "Dify", icon: "🤖", description: "AIChatの連携" },
	];

	return (
		<div className="tw-w-full tw-overflow-x-hidden">
			<section
				id="readme"
				className="readme-section tw-py-16 tw-bg-background tw-text-foreground"
			>
				<div className="tw-max-w-6xl tw-mx-auto tw-px-4">
					<motion.h2
						className="tw-text-4xl tw-font-semibold tw-mb-8 tw-text-primary"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<span className="tw-mr-2">📚</span>Readme.
					</motion.h2>

					<motion.p
						className="tw-text-lg tw-mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						このサイトは以下の技術スタックで構築されています。
					</motion.p>

					<div className="tech-stack tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mb-12">
						{techStack.map((tech, index) => (
							<motion.div
								key={tech.name}
								className="tech-item tw-bg-secondary tw-p-4 tw-rounded-lg tw-flex tw-items-center"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
							>
								<span className="tw-text-3xl tw-mr-4">{tech.icon}</span>
								<div>
									<h3 className="tw-font-semibold tw-text-lg">{tech.name}</h3>
									<p className="tw-text-sm tw-text-muted-foreground">
										{tech.description}
									</p>
								</div>
							</motion.div>
						))}
					</div>

					<motion.div
						className="architecture-diagram tw-mb-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.8 }}
					>
						<h3 className="tw-text-2xl tw-font-semibold tw-mb-4">
							アーキテクチャ図
						</h3>
						<Image
							src="/path-to-your-architecture-diagram.png"
							alt="サイトアーキテクチャ図"
							width={800}
							height={400}
							className="tw-rounded-lg tw-shadow-lg"
						/>
					</motion.div>

					<motion.div
						className="additional-info"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						<h3 className="tw-text-2xl tw-font-semibold tw-mb-4">追加情報</h3>
						<p>
							このサイトは、開発していて楽しいWeb技術を活用して構築されています。Next.jsをベースに、
							Notion APIを利用したコンテンツ管理や、
							Rustで実装されたWebAssemblyによるMarkdownパースなどを取り入れています。
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default ReadmePage;

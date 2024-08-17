"use client";

import Logo from "@/components/elements/Logo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa6";

const roles = [
	"Frontend Engineer",
	"Backend Engineer",
	"Mobile App Engineer",
	"Blockchain Engineer",
];

const HomeContent = () => {
	const [currentRole, setCurrentRole] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const getRoleEmoji = (role: string) => {
		switch (role) {
			case "Frontend Engineer":
				return "🎨";
			case "Backend Engineer":
				return "🖥️";
			case "Mobile App Engineer":
				return "📱";
			case "Blockchain Engineer":
				return "⛓️";
			default:
				return "👨‍💻";
		}
	};

	return (
		<div className="tw-max-w-4xl tw-mx-auto tw-py-16 tw-px-4 sm:tw-px-6 lg:tw-px-8">
			<div className="tw-text-center">
				<div className="tw-flex tw-justify-center tw-items-center tw-mb-8">
					<Logo width={50} height={50} fontSize={24} />
				</div>
				<h1 className="tw-text-3xl tw-font-bold tw-text-foreground sm:tw-text-4xl sm:tw-tracking-tight lg:tw-text-5xl">
					Welcome to esh2n.dev 🚀
				</h1>
				<p className="tw-mt-5 tw-mb-5 tw-text-xl tw-text-muted-foreground">
					Hi
					<WavingHand />, I'm a Shunya Endo, a{" "}
					<AnimatePresence mode="wait">
						<motion.span
							key={roles[currentRole]}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.5 }}
							className="tw-text-primary tw-font-semibold"
						>
							{roles[currentRole]} {getRoleEmoji(roles[currentRole])}
						</motion.span>
					</AnimatePresence>
				</p>

				<div className="tw-mt-16 tw-bg-card tw-p-6 tw-rounded-lg tw-shadow-md">
					<h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-foreground">
						このページは？ 📑
					</h2>
					<p className="tw-mt-3 tw-mb-3 tw-text-lg tw-text-muted-foreground">
						このページは{" "}
						<a
							className="tw-text-primary tw-font-semibold hover:tw-underline"
							href="https://esh2n-keq3b76jd-esh2n.vercel.app/"
						>
							esh2n.dev(v1)
						</a>{" "}
						のリニューアルページです。Next.jsで作成していて、ブログ部分はNotionからのデータを使用しています。詳しい技術構成はこちらのページで説明しています。
					</p>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="/readme"
						className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted tw-mt-4"
					>
						README.mdを見る 📖
					</motion.a>
				</div>

				<div className="tw-mt-4 tw-bg-card tw-p-6 tw-rounded-lg tw-shadow-md">
					<h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-foreground">
						コードビューを見る 👨‍💻
					</h2>
					<p className="tw-text-muted-foreground tw-mb-4">
						このページはタブがあります。"Home.tsx"
						を押して、コードビューを確認してみてください。
					</p>
					<div className="tw-flex tw-justify-center tw-items-center tw-space-x-2 tw-bg-background tw-p-2 tw-rounded">
						<div className="tw-bg-primary tw-text-primary-foreground tw-px-3 tw-py-1 tw-rounded">
							home.tsx
						</div>
						<FaCode className="tw-text-muted-foreground" />
						<span className="tw-text-muted-foreground">Click to view code</span>
					</div>
				</div>

				<div className="tw-mt-4 tw-bg-card tw-p-6 tw-rounded-lg tw-shadow-md">
					<h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-foreground">
						私について 🙋‍♂️
					</h2>
					<p className="tw-text-muted-foreground tw-mb-4">
						ジャンルを問わずモノづくりが好きで、趣味でも仕事でも専念しています。
						<span className="tw-text-secondary tw-font-semibold">
							複雑な問題を簡単にする解決策を考えることが好きです。
						</span>
						また、
						<span className="tw-text-accent tw-font-semibold">
							新しい技術を学び、それを実際のプロジェクトに適用することにも情熱を注いでいます。
						</span>
					</p>
					<div className="tw-flex tw-justify-center tw-space-x-4">
						<motion.a
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href="/about"
							className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted"
						>
							もっと詳しく 👀
						</motion.a>
						<motion.a
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							href="/resume"
							className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted"
						>
							職務経歴書を見る 📄
						</motion.a>
					</div>
				</div>

				<div className="tw-mt-4 tw-bg-card tw-p-6 tw-rounded-lg tw-shadow-md">
					<h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-foreground">
						ブログ 📝
					</h2>
					<p className="tw-text-muted-foreground tw-mb-4">
						技術的な洞察、プロジェクトの更新、そして個人的な思考をブログで共有しています。
						最新の投稿をチェックしてみてください。
					</p>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="/blogs"
						className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted"
					>
						ブログを読む 📚
					</motion.a>
				</div>

				<div className="tw-mt-4 tw-bg-card tw-p-6 tw-rounded-lg tw-shadow-md">
					<h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-foreground">
						設定について ⚙️
					</h2>
					<p className="tw-text-muted-foreground tw-mb-4">
						このサイトはカスタマイズ可能です。ダークモード/ライトモードの切り替え、
						フォントサイズの変更、アクセシビリティオプションなどを設定できます。
						設定ページで自分好みにカスタマイズしてみてください。
					</p>
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="/settings"
						className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted"
					>
						設定を開く ⚙️
					</motion.a>
				</div>
			</div>
		</div>
	);
};

export default HomeContent;

const WavingHand = () => (
	<motion.span
		animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
		transition={{
			duration: 2.5,
			ease: "easeInOut",
			times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
			repeat: Number.MAX_VALUE,
			repeatDelay: 1,
		}}
		style={{ display: "inline-block", transformOrigin: "70% 70%" }}
	>
		👋
	</motion.span>
);

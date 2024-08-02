"use client";

import { activeTabState } from "@/atoms/tabsState";
import Logo from "@/components/elements/Logo";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa6";
import { useRecoilValue } from "recoil";

const roles = [
	"Frontend Engineer",
	"Backend Engineer",
	"Mobile App Engineer",
	"Blockchain Engineer",
];

const HomePage = () => {
	const [currentRole, setCurrentRole] = useState(0);
	const activeTab = useRecoilValue(activeTabState);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentRole((prev) => (prev + 1) % roles.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const PageView = () => (
		<div className="tw-max-w-4xl tw-mx-auto tw-py-16 tw-px-4 sm:tw-px-6 lg:tw-px-8">
			<div className="tw-text-center">
				<div className="tw-flex tw-justify-center tw-items-center tw-mb-8">
					<Logo />
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
						href="/resume"
						className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted tw-mt-4"
					>
						RESUME.mdを見る 📖
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
					<motion.a
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						href="/about"
						className="tw-inline-flex tw-items-center tw-justify-center tw-px-5 tw-py-3 tw-border tw-border-primary tw-text-base tw-font-medium tw-rounded-md tw-text-primary tw-bg-background hover:tw-bg-muted"
					>
						もっと詳しく 👀
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

	// 役割に応じた絵文字を返す関数
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

	const CodeView = () => {
		const [typingComplete, setTypingComplete] = useState(false);

		return (
			<div className="tw-flex tw-h-full tw-bg-background tw-text-foreground tw-font-mono">
				<div className="tw-flex-1 tw-overflow-hidden">
					<div className="tw-bg-card tw-p-2 tw-flex tw-items-center tw-space-x-2">
						<div className="tw-bg-background tw-px-3 tw-py-1 tw-rounded-t tw-text-primary">
							home.tsx
						</div>
						<div className="tw-text-muted-foreground tw-text-sm">
							{typingComplete ? "Ready" : "Typing..."}
						</div>
					</div>
					<div className="tw-p-4 tw-overflow-y-auto tw-h-[calc(100vh-150px)]">
						<pre className="tw-text-sm tw-relative">
							<code>
								{/* 行番号 */}
								<div className="tw-absolute tw-left-0 tw-top-0 tw-bottom-0 tw-pr-4 tw-text-muted-foreground tw-select-none tw-border-r tw-border-muted">
									{Array.from({ length: 30 }, (_, i) => (
										<div
											key={`line-${i}-${Date.now()}`}
											className="tw-text-right"
										>
											{i + 1}
										</div>
									))}
								</div>

								{/* コード本体 */}
								<div className="tw-pl-12">
									<StaticCode />
									<TypewriterText
										text={`
// Define the current role
const currentRole = "${roles[currentRole]}";

// Create a component to display the role
const RoleDisplay: React.FC = () => (
  <div className="role-display">
    <h2>Current Role:</h2>
    <p>{currentRole} {getRoleEmoji(currentRole)}</p>
  </div>
);

// Main component
const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to esh2n.dev(v2)🚀</h1>
      <p>Hi👋, I'm Shunya Endo, a {currentRole}</p>
      <RoleDisplay />
      {/* Add more components and logic here */}
    </div>
  );
};

export default HomePage;`}
										delay={20}
										onComplete={() => setTypingComplete(true)}
									/>
								</div>
							</code>
						</pre>
					</div>
				</div>
			</div>
		);
	};

	return <>{activeTab.isCode ? <CodeView /> : <PageView />}</>;
};
export default HomePage;

const StaticCode = () => (
	<>
		<span className="tw-text-secondary">import</span> React{" "}
		<span className="tw-text-secondary">from</span>{" "}
		<span className="tw-text-accent">'react'</span>;
		<br />
		<span className="tw-text-secondary">import</span> {"{"}motion,
		AnimatePresence{"}"} <span className="tw-text-secondary">from</span>{" "}
		<span className="tw-text-accent">'framer-motion'</span>;
		<br />
		<br />
		<span className="tw-text-muted-foreground">
			{"// Define available roles"}
		</span>
		<br />
		<span className="tw-text-secondary">const</span> roles = [
		<span className="tw-text-accent">"Frontend Engineer"</span>,
		<span className="tw-text-accent">"Backend Engineer"</span>,
		<span className="tw-text-accent">"Mobile App Engineer"</span>,
		<span className="tw-text-accent">"Blockchain Engineer"</span>, ];
		<br />
		<br />
		<span className="tw-text-muted-foreground">
			{"// Function to get role emoji"}
		</span>
		<br />
		<span className="tw-text-secondary">const</span> getRoleEmoji = (role:{" "}
		<span className="tw-text-primary">string</span>) =&gt; {"{"}
		<br />
		&nbsp;&nbsp;<span className="tw-text-secondary">switch</span> (role) {"{"}
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;<span className="tw-text-secondary">case</span>{" "}
		<span className="tw-text-accent">"Frontend Engineer"</span>:
		<span className="tw-text-secondary">return</span>{" "}
		<span className="tw-text-accent">"🎨"</span>;
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;<span className="tw-text-secondary">case</span>{" "}
		<span className="tw-text-accent">"Backend Engineer"</span>:
		<span className="tw-text-secondary">return</span>{" "}
		<span className="tw-text-accent">"🖥️"</span>;
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;<span className="tw-text-secondary">case</span>{" "}
		<span className="tw-text-accent">"Mobile App Engineer"</span>:
		<span className="tw-text-secondary">return</span>{" "}
		<span className="tw-text-accent">"📱"</span>;
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;<span className="tw-text-secondary">case</span>{" "}
		<span className="tw-text-accent">"Blockchain Engineer"</span>:
		<span className="tw-text-secondary">return</span>{" "}
		<span className="tw-text-accent">"⛓️"</span>;
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;<span className="tw-text-secondary">default</span>:
		<span className="tw-text-secondary">return</span>{" "}
		<span className="tw-text-accent">"👨‍💻"</span>;
		<br />
		&nbsp;&nbsp;{"}"}
		<br />
		{"}"};
		<br />
		<br />
	</>
);

const TypewriterText: React.FC<{
	text: string;
	delay: number;
	onComplete: () => void;
}> = ({ text, delay, onComplete }) => {
	const [displayedText, setDisplayedText] = useState("");

	useEffect(() => {
		let i = 0;
		const timer = setInterval(() => {
			if (i < text.length) {
				setDisplayedText((prev) => prev + text.charAt(i));
				i++;
			} else {
				clearInterval(timer);
				onComplete();
			}
		}, delay);

		return () => clearInterval(timer);
	}, [text, delay, onComplete]);

	return <>{displayedText}</>;
};

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

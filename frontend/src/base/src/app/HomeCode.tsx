import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";

const HomeCode = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const homeContent = `
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/elements/Logo";

const roles = ["Frontend Engineer", "Backend Engineer", "Mobile App Engineer", "Blockchain Engineer"];

const HomeContent: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <Logo width={50} height={50} fontSize={24} />
      <h1>Welcome to esh2n.dev 🚀</h1>
      <p>
        Hi <WavingHand />, I'm Shunya Endo, a{" "}
        <AnimatePresence mode="wait">
          <motion.span key={roles[currentRole]} className="role">
            {roles[currentRole]} {getRoleEmoji(roles[currentRole])}
          </motion.span>
        </AnimatePresence>
      </p>
      <Section title="このページは？ 📑">
        <p>
          このページは{" "}
          <a href="https://esh2n-keq3b76jd-esh2n.vercel.app/">esh2n.dev(v1)</a>{" "}
          のリニューアルページです。Next.jsで作成していて、ブログ部分はNotionからのデータを使用しています。
        </p>
        <Button href="/readme">README.mdを見る 📖</Button>
      </Section>
      <Section title="コードビューを見る 👨‍💻">
        <p>このページはタブがあります。"Home.tsx" を押して、コードビューを確認してみてください。</p>
        <CodeViewButton />
      </Section>
      <Section title="私について 🙋‍♂️">
        <p>
          ジャンルを問わずモノづくりが好きで、趣味でも仕事でも専念しています。
          <span className="highlight">複雑な問題を簡単にする解決策を考えることが好きです。</span>
          また、<span className="highlight">新しい技術を学び、それを実際のプロジェクトに適用することにも情熱を注いでいます。</span>
        </p>
        <Button href="/about">もっと詳しく 👀</Button>
      </Section>
      <Section title="設定について ⚙️">
        <p>
          このサイトはカスタマイズ可能です。ダークモード/ライトモードの切り替え、
          フォントサイズの変更、アクセシビリティオプションなどを設定できます。
          設定ページで自分好みにカスタマイズしてみてください。
        </p>
        <Button href="/settings">設定を開く ⚙️</Button>
      </Section>
    </div>
  );
};

const WavingHand: React.FC = () => (
  <motion.span
    animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
    transition={{
      duration: 2.5,
      ease: "easeInOut",
      times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
      repeat: Infinity,
      repeatDelay: 1,
    }}
    style={{ display: "inline-block", transformOrigin: "70% 70%" }}
  >
    👋
  </motion.span>
);

const getRoleEmoji = (role: string): string => {
  const emojiMap = {
    "Frontend Engineer": "🎨",
    "Backend Engineer": "🖥️",
    "Mobile App Engineer": "📱",
    "Blockchain Engineer": "⛓️",
  };
  return emojiMap[role] || "👨‍💻";
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="section">
    <h2>{title}</h2>
    {children}
  </div>
);

const Button: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    className="button"
  >
    {children}
  </motion.a>
);

const CodeViewButton: React.FC = () => (
  <div className="code-view-button">
    <div className="file-name">home.tsx</div>
    <span>Click to view code</span>
  </div>
);

export default HomeContent;
  `;

	const contentLines = homeContent.split("\n");

	return (
		<div className="home-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={homeContent} language="tsx" />
			</div>
		</div>
	);
};

export default HomeCode;

import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";

const AboutCode = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const calculateAge = (birthdate: string): number => {
		const today = new Date();
		const birth = new Date(birthdate);
		let age = today.getFullYear() - birth.getFullYear();
		const monthDifference = today.getMonth() - birth.getMonth();
		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birth.getDate())
		) {
			age--;
		}
		return age;
	};

	const age = calculateAge("1997-12-15");

	const aboutContent = `
# 👦 About me.

## プロフィール

![avatar](https://avatars.githubusercontent.com/u/55518345?v=4)

**Shunya ENDO**

he/him, ${age} y.o.

ミーハーエンジニア

### SNS

- [Twitter](https://twitter.com/esh2n)
- [GitHub](https://github.com/esh2n)
- [Zenn](https://zenn.dev/esh2n)

> 好奇心の赴くままに、生きています。

## 技術スタック

Go、TypeScript、gRPC、Next.js、Flutter、Firebase、GCP、Blockchainは実務経験があります。

また、Elm、Deno、Rustなどが好きでよく触っています。

## 開発哲学

ユーザーのニーズに最大限答えるものを大事にしたいという気持ちと、自分の好きなものを深めたいという気持ちが強くあります。

興味の幅はかなり広い方で、時間が許すのであれば何でも学びたいと思っています。現在は暗号資産のウォレット開発、バックエンド、フロントエンド、ネイティブアプリケーション開発に注力しております。
`;

	const contentLines = aboutContent.split("\n");

	return (
		<div className="about-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={aboutContent} language="markdown" />
			</div>
		</div>
	);
};

export default AboutCode;

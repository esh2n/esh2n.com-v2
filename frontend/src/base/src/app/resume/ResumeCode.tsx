import CodeViewer from "@/components/elements/CodeViewer";
import React, { useEffect, useState } from "react";

const ResumeCode = () => {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const resumeContent = `
# 📄 Resume.

## 💼 職務経歴

### ソフトウェアエンジニア @ 株式会社Ginco
*2021年12月 - 現在*

正社員契約で暗号資産のウォレットのバックエンド開発。Go、TypeScript、gRPC, Solidityを使用。

### ソフトウェアエンジニア @ 株式会社PortFolder
*2021年7月 - 2022年8月*

業務委託契約でモバイルアプリケーションの開発。Flutter, Firebaseを使用。

### リードエンジニア @ 株式会社PIVOT
*2021年4月 - 2022年1月*

正社員契約でウェブアプリケーション、モバイルアプリケーションの開発。JavaScript, Nuxt.js, TypeScript, Flutter, Kotlin, Firebaseを使用。

### ソフトウェアエンジニア @ 株式会社アットゲーム
*2020年2月 - 2021年12月*

業務委託契約でモバイルアプリケーション開発。Flutter、Firebaseを使用。

## 🛠 スキル

- Go
- TypeScript
- gRPC
- Next.js
- Flutter
- Firebase
- GCP
- Blockchain
- React
- Node.js
- Elm
- Deno
- Rust

## 🎓 学歴

### 芝浦工業大学
システム理工学部 電子情報システム学科 中途退学
`;

	const contentLines = resumeContent.split("\n");

	return (
		<div className="resume-code tw-max-w-4xl">
			<div className="code-container">
				<div className="line-numbers">
					{contentLines.map((line, index) => (
						<span key={line}>{index + 1}</span>
					))}
				</div>
				<CodeViewer content={resumeContent} language="markdown" />
			</div>
		</div>
	);
};

export default ResumeCode;

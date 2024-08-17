import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.scss";
import AIChat from "@/components/elements/AIChat";
import Footer from "@/components/layouts/Footer/Footer";
import Header from "@/components/layouts/Header/Header";
import IconSideBar from "@/components/layouts/IconSideBar";
import CombinedSidebar from "@/components/layouts/SideBar";
import VSCodeTabs from "@/components/layouts/Tab";
import RecoilProvider from "./recoilProvider";

const inter = Fira_Code({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: {
		template: "%s | esh2n.dev",
		default: "esh2n.dev",
	},
	description: "esh2n.dev | ShunyaEndo's portfolio site",
	openGraph: {
		title: "esh2n.dev",
		description: "esh2n.dev | ShunyaEndo's portfolio site",
		url: "https://esh2n.dev",
		siteName: "esh2n.dev",
		images: [
			{
				url: "https://esh2n.dev/og.png",
				width: 1200,
				height: 630,
				alt: "esh2n.dev",
				type: "image/png",
			},
		],
	},
	keywords: [
		"esh2n",
		"esh2n.dev",
		"ShunyaEndo",
		"portfolio",
		"developer",
		"engineer",
	],
	authors: {
		name: "ShunyaEndo",
		url: "https://esh2n.dev",
	},
	category: "technology",
	publisher: "esh2n.dev",
	robots: {
		index: true,
		follow: true,
	},
	twitter: {
		card: "summary_large_image",
		site: "@esh2n",
		creator: "@esh2n",
		title: "esh2n.dev",
		description: "esh2n.dev | ShunyaEndo's portfolio site",
		images: {
			url: "https://esh2n.dev/og.png",
			width: 1200,
			height: 630,
			alt: "esh2n.dev",
			type: "image/png",
		},
	},
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1.0,maximum-scale=1.0"
				/>
			</head>
			<body className={inter.className}>
				<RecoilProvider>
					<div className="tw-flex tw-flex-col tw-h-screen tw-overflow-hidden">
						<Header />
						<div className="tw-flex tw-flex-1 tw-overflow-hidden">
							<div className="tw-hidden md:tw-block">
								<IconSideBar />
							</div>
							<CombinedSidebar />
							<div className="tw-flex tw-flex-col tw-flex-1 tw-min-w-0">
								<VSCodeTabs />
								<main className="tw-flex-1 tw-overflow-auto">{children}</main>
							</div>
							<AIChat />
						</div>
						<Footer />
					</div>
				</RecoilProvider>
			</body>
		</html>
	);
}

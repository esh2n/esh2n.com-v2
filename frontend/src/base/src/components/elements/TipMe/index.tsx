import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Coffee, Coins, Copy, Github, Heart } from "lucide-react";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import "./style.scss";

const TipMeModal = () => {
	type CryptoInfo = {
		name: string;
		symbol: string;
		address: string;
		iconImgLink: string;
	};

	const [cryptoInfos] = useState<CryptoInfo[]>([
		{
			name: "Bitcoin",
			symbol: "BTC",
			address: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
			iconImgLink: "/images/bitcoin-btc-logo.svg",
		},
		{
			name: "Ethereum",
			symbol: "ETH",
			address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
			iconImgLink: "/images/ethereum-eth-logo.svg",
		},
		{
			name: "Polygon",
			symbol: "MATIC",
			address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
			iconImgLink: "/images/polygon-matic-logo.svg",
		},
		{
			name: "Solana",
			symbol: "SOL",
			address: "7ZsS6QEspSzJkBgGMtN7XMiyY5wB5LJNAYc7Dz8XbnM1",
			iconImgLink: "/images/solana-sol-logo.svg",
		},
	]);
	const [selectedCrypto, setSelectedCrypto] = useState<CryptoInfo>(
		cryptoInfos[0],
	);
	const [githubUsername] = useState<string>("esh2n");
	const [otherSupportLink] = useState<string>("https://example.com/support");
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setIsCopied(true);
			toast({
				title: "Address Copied",
				description: "The crypto address has been copied to your clipboard.",
			});
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -20 },
		transition: { duration: 0.3 },
	};

	const TipMeContent = () => (
		<Card className="tw-w-full tw-max-w-[550px] tw-overflow-hidden tw-border-none tw-shadow-none">
			<CardHeader className="tw-bg-secondary tw-text-secondary-foreground tw-rounded-t-lg tw-pt-10 tw-pb-6 tw-px-6">
				<CardTitle className="title">Support This Project</CardTitle>
				<CardDescription className="tw-text-secondary-foreground tw-opacity-80">
					Choose your preferred way to support
				</CardDescription>
			</CardHeader>
			<CardContent className="tw-p-6">
				<Tabs defaultValue="crypto">
					<TabsList className="tw-grid tw-w-full tw-grid-cols-3 tw-mb-6">
						<TabsTrigger
							value="crypto"
							className="tw-data-[state=active]:tw-bg-secondary tw-data-[state=active]:tw-text-secondary-foreground"
						>
							<Coins className="tw-mr-2 tw-h-4 tw-w-4" />
							Crypto
						</TabsTrigger>
						<TabsTrigger
							value="github"
							className="tw-data-[state=active]:tw-bg-secondary tw-data-[state=active]:tw-text-secondary-foreground"
						>
							<Github className="tw-mr-2 tw-h-4 tw-w-4" />
							GitHub
						</TabsTrigger>
						<TabsTrigger
							value="other"
							className="tw-data-[state=active]:tw-bg-secondary tw-data-[state=active]:tw-text-secondary-foreground"
						>
							<Coffee className="tw-mr-2 tw-h-4 tw-w-4" />
							Other
						</TabsTrigger>
					</TabsList>
					<AnimatePresence mode="wait">
						<TabsContent value="crypto">
							<motion.div {...fadeInUp} className="tw-space-y-4">
								<Select
									onValueChange={(v) =>
										setSelectedCrypto(
											cryptoInfos.find((crypto) => crypto.symbol === v) ||
												cryptoInfos[0],
										)
									}
									defaultValue={selectedCrypto.symbol}
								>
									<SelectTrigger className="tw-w-full">
										<SelectValue placeholder="Select cryptocurrency" />
									</SelectTrigger>
									<SelectContent>
										{cryptoInfos.map((crypto) => (
											<SelectItem key={crypto.symbol} value={crypto.symbol}>
												<div className="tw-flex tw-items-center">
													<img
														src={crypto.iconImgLink}
														alt={crypto.name}
														className="tw-w-6 tw-h-6 tw-mr-2"
													/>
													{crypto.name}
												</div>
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<p className="tw-text-sm tw-font-medium tw-flex tw-items-center">
									<img
										src={selectedCrypto.iconImgLink}
										alt={selectedCrypto.name}
										className="tw-w-6 tw-h-6 tw-mr-2"
									/>
									Send {selectedCrypto.symbol} to this address:
								</p>
								<div className="tw-flex tw-space-x-2">
									<Input
										value={selectedCrypto.address}
										readOnly
										className="tw-bg-muted"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => copyToClipboard(selectedCrypto.address)}
										className="tw-hover:tw-bg-secondary tw-hover:tw-text-secondary-foreground tw-transition-colors"
									>
										{isCopied ? (
											<Check className="tw-h-4 tw-w-4" />
										) : (
											<Copy className="tw-h-4 tw-w-4" />
										)}
									</Button>
								</div>
								<div className="tw-flex tw-justify-center tw-mt-6">
									<div className="tw-flex tw-justify-center tw-mt-6">
										<DynamicQRCode
											value={selectedCrypto.address}
											size={200}
											logoSrc={selectedCrypto.iconImgLink}
										/>
									</div>
									{/* <QRCode
										value={selectedCrypto.address}
										size={200}
										bgColor={"#ffffff"}
										fgColor={"#000000"}
										level={"L"}
										includeMargin={false}
										imageSettings={{
											src: selectedCrypto.iconImgLink,
											x: undefined,
											y: undefined,
											height: 40,
											width: 40,
											excavate: true,
										}}
									/> */}
								</div>
							</motion.div>
						</TabsContent>
						<TabsContent value="github">
							<motion.div {...fadeInUp} className="tw-space-y-4">
								<p className="tw-text-sm tw-font-medium">
									Support me on GitHub Sponsors:
								</p>
								<Button
									className="tw-w-full tw-bg-[#24292e] tw-hover:tw-bg-[#1b1f23] tw-text-white"
									onClick={() =>
										window.open(
											`https://github.com/sponsors/${githubUsername}`,
											"_blank",
										)
									}
								>
									<Github className="tw-mr-2 tw-h-5 tw-w-5" /> Sponsor on GitHub
								</Button>
							</motion.div>
						</TabsContent>
						<TabsContent value="other">
							<motion.div {...fadeInUp} className="tw-space-y-4">
								<p className="tw-text-sm tw-font-medium">
									Support through other platforms:
								</p>
								<Button
									className="tw-w-full tw-bg-secondary tw-text-secondary-foreground tw-hover:tw-opacity-90"
									onClick={() => window.open(otherSupportLink, "_blank")}
								>
									<Coffee className="tw-mr-2 tw-h-5 tw-w-5" /> Buy me a coffee
								</Button>
							</motion.div>
						</TabsContent>
					</AnimatePresence>
				</Tabs>
			</CardContent>
			<CardFooter className="tw-bg-muted tw-py-4 tw-px-6 tw-rounded-b-lg">
				<p className="tw-text-sm tw-pt-4 tw-text-muted-foreground tw-text-center tw-w-full">
					Your support helps keep this site alive. Thank you! 🙏
				</p>
			</CardFooter>
		</Card>
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					className="tip-button tw-bg-gradient-to-r tw-from-primary tw-to-secondary tw-text-white tw-hover:tw-from-primary-dark tw-hover:tw-to-secondary-dark tw-transition-all tw-duration-300 tw-ease-in-out tw-transform tw-hover:tw-scale-105 tw-text-background"
					variant="outline"
				>
					<Coins className="tw-mr-2 tw-h-5 tw-w-5" />
					Support Project
				</Button>
			</DialogTrigger>
			<DialogContent className="tw-sm:max-w-[600px] tw-p-0 tw-border-none tw-shadow-xl tw-overflow-hidden">
				<div className="tw-pt-10">
					<TipMeContent />
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TipMeModal;

const DynamicQRCode = ({
	value,
	size,
	logoSrc,
}: { value: string; size: number; logoSrc: string }) => {
	const [fgColor, setFgColor] = useState("#000000");
	const [bgColor, setBgColor] = useState("#ffffff");

	useEffect(() => {
		const updateColors = () => {
			const computedStyle = getComputedStyle(document.documentElement);
			setFgColor(
				computedStyle.getPropertyValue("--foreground").trim() || "#000000",
			);
			setBgColor(
				computedStyle.getPropertyValue("--background").trim() || "#ffffff",
			);
		};

		updateColors();

		const observer = new MutationObserver(updateColors);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<QRCode
			value={value}
			size={size}
			bgColor={bgColor}
			fgColor={fgColor}
			level={"L"}
			includeMargin={false}
			imageSettings={{
				src: logoSrc,
				x: undefined,
				y: undefined,
				height: 40,
				width: 40,
				excavate: true,
			}}
		/>
	);
};

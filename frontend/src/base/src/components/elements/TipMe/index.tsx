"use client";
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
import { Check, Coins, Copy, Github, Heart } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import React, { useEffect, useState } from "react";

import "./style.scss";

const TipMeModal = () => {
	type CryptoAddresses = {
		bitcoin: string;
		ethereum: string;
		polygon: string;
		solana: string;
	};
	// TODO: convert to CryptoInfo type (from cryptoAddresses)
	type CryptoInfo = {
		name: string;
		symbol: string;
		address: string;
		iconImgLink: string;
	};

	const [cryptoAddresses] = useState<CryptoAddresses>({
		bitcoin: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
		ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		polygon: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
		solana: "7ZsS6QEspSzJkBgGMtN7XMiyY5wB5LJNAYc7Dz8XbnM1",
	});
	const [selectedCrypto, setSelectedCrypto] =
		useState<keyof CryptoAddresses>("bitcoin");
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
	const TipMeContent = () => (
		<Card className="tw-w-full tw-max-w-[550px]">
			<CardHeader>
				<CardTitle>Support This Project</CardTitle>
				<CardDescription>Choose your preferred way to support</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="crypto">
					<TabsList className="tw-grid tw-w-full tw-grid-cols-3">
						<TabsTrigger value="crypto">Crypto</TabsTrigger>
						<TabsTrigger value="github">GitHub</TabsTrigger>
						<TabsTrigger value="other">Other</TabsTrigger>
					</TabsList>
					<TabsContent value="crypto">
						<div className="tw-space-y-4">
							<Select
								onValueChange={(v) =>
									setSelectedCrypto(v as keyof CryptoAddresses)
								}
								defaultValue={selectedCrypto}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select cryptocurrency" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="bitcoin">Bitcoin</SelectItem>
									<SelectItem value="ethereum">Ethereum</SelectItem>
									<SelectItem value="polygon">Polygon</SelectItem>
									<SelectItem value="solana">Solana</SelectItem>
								</SelectContent>
							</Select>
							<p className="tw-text-sm">
								Send {selectedCrypto} to this address:
							</p>
							<div className="tw-flex tw-space-x-2">
								<Input value={cryptoAddresses[selectedCrypto]} readOnly />
								<Button
									variant="outline"
									size="icon"
									onClick={() =>
										copyToClipboard(cryptoAddresses[selectedCrypto])
									}
								>
									{isCopied ? (
										<Check className="tw-h-4 tw-w-4" />
									) : (
										<Copy className="tw-h-4 tw-w-4" />
									)}
								</Button>
							</div>
							<div className="tw-flex tw-justify-center">
								<QRCodeSVG
									imageSettings={{
										src: "https://avatars.githubusercontent.com/u/55518345?v=4",
										height: 24,
										width: 24,
										excavate: true,
									}}
									className="qrcode tw-mt-4 tw-w-24 tw-h-24"
									value={cryptoAddresses[selectedCrypto]}
								/>
							</div>
						</div>
					</TabsContent>
					<TabsContent value="github">
						<div className="tw-space-y-4">
							<p className="tw-text-sm">Support me on GitHub Sponsors:</p>
							<Button
								className="tw-w-full"
								onClick={() =>
									window.open(
										`https://github.com/sponsors/${githubUsername}`,
										"_blank",
									)
								}
							>
								<Github className="tw-mr-2 tw-h-4 tw-w-4" /> Sponsor on GitHub
							</Button>
						</div>
					</TabsContent>
					<TabsContent value="other">
						<div className="tw-space-y-4">
							<p className="tw-text-sm">Support through other platforms:</p>
							<Button
								className="tw-w-full"
								onClick={() => window.open(otherSupportLink, "_blank")}
							>
								<Heart className="tw-mr-2 tw-h-4 tw-w-4" /> Support This Project
							</Button>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
			<CardFooter>
				<p className="tw-text-sm tw-text-muted-foreground">
					Thank you for your support!
				</p>
			</CardFooter>
		</Card>
	);

	return (
		<Dialog>
			<DialogTrigger className="tip-button" asChild>
				<Button className="tip-button" variant="outline">
					<Coins className="tw-mr-2 tw-h-4 tw-w-4" />
					Tip me
				</Button>
			</DialogTrigger>
			<DialogContent className="tw-sm:max-w-[425px]">
				<TipMeContent />
			</DialogContent>
		</Dialog>
	);
};

export default TipMeModal;

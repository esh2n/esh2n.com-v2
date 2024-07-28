"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { SiZenn } from "react-icons/si";
import "./style.scss";

const AboutPage: React.FC = () => {
	return (
		<div className="tw-w-full tw-overflow-x-hidden">
			<section id="about" className="about-section">
				<div className="container">
					<motion.h2
						className="section-title"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<span className="emoji">👦</span>About me.
					</motion.h2>

					<div className="profile-container">
						<ProfileCard />
						<ProfileDetails />
					</div>
				</div>
			</section>
		</div>
	);
};

const ProfileCard: React.FC = () => {
	const calculateAge = (birthdate: Date): number => {
		const today = new Date();
		let age = today.getFullYear() - birthdate.getFullYear();
		const monthDifference = today.getMonth() - birthdate.getMonth();

		if (
			monthDifference < 0 ||
			(monthDifference === 0 && today.getDate() < birthdate.getDate())
		) {
			age--;
		}

		return age;
	};

	const birthDate = new Date("1997-12-15");
	const age = calculateAge(birthDate);

	return (
		<motion.div
			className="profile-card"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<Image
				src="https://avatars.githubusercontent.com/u/55518345?v=4"
				alt="avatar"
				width={150}
				height={150}
				className="avatar"
			/>
			<h3 className="name">Shunya ENDO</h3>
			<p className="age">he/him, {age} y.o.</p>
			<p className="job-title">ミーハーエンジニア</p>
			<div className="social-icons">
				<a href="https://twitter.com/esh2n" className="icon-link">
					<FaTwitter size={24} />
				</a>
				<a href="https://github.com/esh2n" className="icon-link">
					<FaGithub size={24} />
				</a>
				<a href="https://zenn.dev/esh2n" className="icon-link">
					<SiZenn size={24} />
				</a>
			</div>
			<p className="motto">好奇心の赴くままに、生きています。</p>
		</motion.div>
	);
};

const ProfileDetails: React.FC = () => {
	return (
		<motion.div
			className="profile-details"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
		>
			<div className="detail-section">
				<h4 className="section-subtitle">技術スタック</h4>
				<p>
					Go TypeScript gRPC Next.js Flutter Firebase GCP Blockchain
					あたりは実務経験があります。
				</p>
				<p>また、Elm Deno Rust などが好きでよく触っています。</p>
			</div>
			<div className="detail-section">
				<h4 className="section-subtitle">開発哲学</h4>
				<p>
					ユーザーのニーズに最大限答えるものを大事にしたいという気持ちと、自分の好きなものを深めたいという気持ちが強くあります。
				</p>
				<p>
					興味の幅はかなり広い方で、時間が許すのであれば何でも学びたいと思っています。現在は暗号資産のウォレット開発、バックエンド、フロントエンド、ネイティブアプリケーション開発に注力しております。
				</p>
			</div>
		</motion.div>
	);
};

export default AboutPage;

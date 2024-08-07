"use client";

import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaTools } from "react-icons/fa";
import "./style.scss";

const ResumePage: React.FC = () => {
	return (
		<div className="tw-w-full tw-overflow-x-hidden">
			<section
				id="resume"
				className="resume-section tw-py-16 tw-bg-background tw-text-foreground"
			>
				<div className="tw-max-w-6xl tw-mx-auto tw-px-4">
					<motion.h2
						className="tw-text-4xl tw-font-semibold tw-mb-8 tw-text-primary"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<span className="tw-mr-2">📄</span>Resume.
					</motion.h2>

					<div className="resume-content tw-grid tw-gap-8">
						<WorkExperience />
						<Skills />
						<Education />
					</div>
				</div>
			</section>
		</div>
	);
};

const WorkExperience: React.FC = () => {
	const experiences = [
		{
			company: "株式会社Ginco",
			position: "ソフトウェアエンジニア",
			period: "2021年12月 - 現在",
			description:
				"正社員契約で暗号資産のウォレットのバックエンド開発。Go、TypeScript、gRPC, Solidityを使用。",
		},
		{
			company: "株式会社PortFolder",
			position: "ソフトウェアエンジニア",
			period: "2021年7月 - 2022年8月",
			description:
				"業務委託契約でモバイルアプリケーションの開発。Flutter, Firebaseを使用。",
		},
		{
			company: "株式会社PIVOT",
			position: "リードエンジニア",
			period: "2021年4月 - 2022年1月",
			description:
				"正社員契約でウェブアプリケーション、モバイルアプリケーションの開発。JavaScript, Nuxt.js, TypeScript, Flutter, Kotlin, Firebaseを使用。",
		},
		{
			company: "株式会社アットゲーム",
			position: "ソフトウェアエンジニア",
			period: "2020年2月 - 2021年12月",
			description:
				"業務委託契約でモバイルアプリケーション開発。Flutter、Firebaseを使用。",
		},
	];

	return (
		<motion.div
			className="resume-section timeline-container"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
		>
			<h3 className="tw-text-2xl tw-font-semibold tw-mb-8 tw-text-primary tw-flex tw-items-center">
				<FaBriefcase className="tw-mr-2" /> 職務経歴
			</h3>
			<div className="timeline">
				{experiences.map((exp, index) => (
					<motion.div
						key={exp.company}
						className="timeline-item"
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
					>
						<div className="timeline-marker" />
						<div className="timeline-content">
							<h4 className="tw-text-xl tw-font-medium tw-text-foreground">
								{exp.position} @ {exp.company}
							</h4>
							<p className="tw-text-sm tw-text-muted-foreground tw-mb-2">
								{exp.period}
							</p>
							<p className="tw-text-foreground">{exp.description}</p>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

const Skills: React.FC = () => {
	const skills = [
		"Go",
		"TypeScript",
		"gRPC",
		"Next.js",
		"Flutter",
		"Firebase",
		"GCP",
		"Blockchain",
		"React",
		"Node.js",
		"Elm",
		"Deno",
		"Rust",
	];

	return (
		<motion.div
			className="resume-section timeline-container"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
		>
			<h3 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-primary tw-flex tw-items-center">
				<FaTools className="tw-mr-2" /> スキル
			</h3>
			<div className="skills-container tw-flex tw-flex-wrap tw-gap-2">
				{skills.map((skill) => (
					<span
						key={skill}
						className="tw-bg-primary tw-text-primary-foreground tw-px-3 tw-py-1 tw-rounded-full tw-text-sm"
					>
						{skill}
					</span>
				))}
			</div>
		</motion.div>
	);
};

const Education: React.FC = () => {
	return (
		<motion.div
			className="resume-section timeline-container"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.6 }}
		>
			<h3 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-primary tw-flex tw-items-center">
				<FaGraduationCap className="tw-mr-2" /> 学歴
			</h3>
			<div className="education-item">
				<h4 className="tw-text-xl tw-font-medium tw-text-foreground">
					芝浦工業大学
				</h4>
				<p className="tw-text-muted-foreground">
					システム理工学部 電子情報システム学科 中途退学
				</p>
			</div>
		</motion.div>
	);
};

export default ResumePage;

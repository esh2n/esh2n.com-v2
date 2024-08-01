import { ReactNode } from "react";

interface CardProps {
	title: string;
	date: string;
	description: string;
	image: string;
}

const ZeroMarginParagraph = ({
	children,
}: {
	children: React.ReactNode;
}) => <p style={{ margin: 0, padding: 0 }}>{children}</p>;

export const Card = ({ title, date, description, image }: CardProps) => (
	<div
		style={{
			width: "100%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			background: "linear-gradient(to bottom, #4481F9, #CC61A4)",
		}}
	>
		<div
			style={{
				padding: "48px 96px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				background: "#25293D",
				fontSize: "76px",
				color: "white",
			}}
		>
			<ZeroMarginParagraph>Chottoshita</ZeroMarginParagraph>
			<ZeroMarginParagraph>OGP Gazou</ZeroMarginParagraph>
			<ZeroMarginParagraph>Desu</ZeroMarginParagraph>
		</div>
	</div>
);

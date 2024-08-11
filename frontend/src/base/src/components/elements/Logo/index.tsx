import Image from "next/image";
import "./style.scss";

const Logo = ({
	width,
	height,
	fontSize,
}: { width: number; height: number; fontSize: number }) => (
	<div className="logo-container">
		<div
			className="image-wrapper"
			style={{
				width: `${width}px`,
				height: `${height}px`,
				position: "relative",
			}}
		>
			<Image
				src="/images/blog_dev.png"
				alt="esh2n.dev logo"
				fill
				style={{ objectFit: "contain" }}
			/>
		</div>
		<span
			className="logo-text tw-text-foreground"
			style={{ fontSize: `${fontSize}px` }}
		>
			esh2n.dev
		</span>
	</div>
);

export default Logo;

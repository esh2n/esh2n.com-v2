import { Check, FileSpreadsheet, FileType2 } from "lucide-react";
import "./style.scss";

const Footer: React.FC = () => {
	return (
		<footer className="tw-bg-card tw-text-foreground tw-text-xs tw-py-1 tw-px-4 tw-flex tw-justify-between tw-items-center tw-h-6">
			<div>© {new Date().getFullYear()} esh2n.dev</div>
			<div className="footer-info">
				<span className="footer-item">
					<Check className="tw-w-3 tw-h-3 tw-mr-1" /> Biome 1.8.3
				</span>
				<span className="footer-item">
					<FileSpreadsheet className="tw-w-3 tw-h-3 tw-mr-1" /> Spaces: 4
				</span>
				<span className="footer-item">
					<FileType2 className="tw-w-3 tw-h-3 tw-mr-1" /> TypeScript TSX
				</span>
			</div>
		</footer>
	);
};

export default Footer;

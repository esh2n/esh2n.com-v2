import { useCallback, useEffect, useRef, useState } from "react";

interface ResizableOptions {
	initialWidth: number;
	minWidth: number;
	maxWidth: number;
	position: "left" | "right";
	onResize?: (newWidth: number) => void;
}

const useResizable = ({
	initialWidth,
	minWidth,
	maxWidth,
	position,
	onResize,
}: ResizableOptions) => {
	const [width, setWidth] = useState(initialWidth);
	const elementRef = useRef<HTMLDivElement>(null);
	const currentWidthRef = useRef(initialWidth);
	const startXRef = useRef(0);
	const startWidthRef = useRef(initialWidth);

	const updateSize = useCallback(
		(newWidth: number) => {
			const clampedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
			currentWidthRef.current = clampedWidth;
			setWidth(clampedWidth);
			if (elementRef.current) {
				elementRef.current.style.width = `${clampedWidth}px`;
			}
			if (onResize) {
				onResize(clampedWidth);
			}
		},
		[minWidth, maxWidth, onResize],
	);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		let isResizing = false;

		const startResizing = (e: MouseEvent) => {
			isResizing = true;
			startXRef.current = e.clientX;
			startWidthRef.current = currentWidthRef.current;
			document.addEventListener("mousemove", resize);
			document.addEventListener("mouseup", stopResizing);
		};

		const resize = (e: MouseEvent) => {
			if (!isResizing) return;
			const deltaX =
				position === "left"
					? startXRef.current - e.clientX
					: e.clientX - startXRef.current;
			const newWidth = startWidthRef.current + deltaX;
			updateSize(newWidth);
		};

		const stopResizing = () => {
			isResizing = false;
			document.removeEventListener("mousemove", resize);
			document.removeEventListener("mouseup", stopResizing);
		};

		const resizer = element.querySelector(".resizer") as HTMLElement;
		if (resizer) {
			resizer.addEventListener("mousedown", startResizing);
		}

		return () => {
			if (resizer) {
				resizer.removeEventListener("mousedown", startResizing);
			}
			document.removeEventListener("mousemove", resize);
			document.removeEventListener("mouseup", stopResizing);
		};
	}, [updateSize, position]);

	return { width, elementRef };
};

export default useResizable;

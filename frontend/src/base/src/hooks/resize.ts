import { useCallback, useEffect, useRef, useState } from "react";

interface ResizableOptions {
	initialWidth: number;
	minWidth: number;
	maxWidth: number;
	position: "left" | "right";
}

const useResizable = ({
	initialWidth,
	minWidth,
	maxWidth,
	position,
}: ResizableOptions) => {
	const [width, setWidth] = useState(initialWidth);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const startWidth = useRef(0);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			isDragging.current = true;
			startX.current = e.clientX;
			startWidth.current = width;
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		},
		[width],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging.current) return;
			const diff = e.clientX - startX.current;
			const newWidth =
				position === "right"
					? Math.max(minWidth, Math.min(maxWidth, startWidth.current + diff))
					: Math.max(minWidth, Math.min(maxWidth, startWidth.current - diff));
			setWidth(newWidth);
		},
		[maxWidth, minWidth, position],
	);

	const handleMouseUp = useCallback(() => {
		isDragging.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	}, [handleMouseMove]);

	useEffect(() => {
		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, [handleMouseMove, handleMouseUp]);

	return { width, setWidth, handleMouseDown };
};

export default useResizable;

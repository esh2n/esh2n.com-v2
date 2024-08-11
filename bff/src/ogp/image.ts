import satori from "satori";
import { Resvg } from "@resvg/resvg-wasm";
import { ReactNode } from "react";

import { initWasm } from "./wasm";
import { withCache } from "./utils";
type Weight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Style$1 = "normal" | "italic";
interface FontOptions {
	data: ArrayBuffer;
	name: string;
	weight?: Weight;
	style?: Style$1;
	lang?: string;
}

const init = initWasm();
export const generateImage = async (
	element: ReactNode,
	width = 1200,
	height = 630,
	fonts: FontOptions[],
	loadAdditionalAsset: (
		languageCode: string,
		segment: string,
	) => Promise<string | FontOptions[]>,
): Promise<Uint8Array> => {
	await init();
	const svg = await satori(element, {
		width,
		height,
		fonts,
		loadAdditionalAsset: withCache(loadAdditionalAsset),
	});
	const png = new Resvg(svg).render().asPng();

	return png;
};

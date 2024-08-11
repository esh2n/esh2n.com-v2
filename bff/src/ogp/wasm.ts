import { initWasm as initResvg } from "@resvg/resvg-wasm";
import { init as initSatori } from "satori/wasm";
import initYoga from "yoga-wasm-web";

// @ts-ignore
import wasmResvg from "../../node_modules/@resvg/resvg-wasm/index_bg.wasm";
// @ts-ignore
import wasmYoga from "../../node_modules/yoga-wasm-web/dist/yoga.wasm";

export const initWasm = () => {
	let isInit = false;
	return async () => {
		if (isInit) {
			return;
		}
		const yoga = await initYoga(wasmYoga);
		initSatori(yoga);
		await initResvg(wasmResvg);
		isInit = true;
	};
};

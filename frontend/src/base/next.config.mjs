/** @type {import('next').NextConfig} */
const nextConfig = {
	async serverMiddleware(app) {
		if (process.env.NODE_ENV === "development") {
			app.use(
				"/api",
				createProxyMiddleware({
					target: "http://localhost:5000",
					changeOrigin: true,
					pathRewrite: { "^/api": "" },
				}),
			);
		}
	},
	images: {
		domains: ["avatars.githubusercontent.com", "bff.esh2n.workers.dev"],
	},
	webpack(config, { isServer, dev }) {
		config.experiments = {
			...config.experiments,
			asyncWebAssembly: true,
			layers: true,
		};
		config.output.webassemblyModuleFilename =
			isServer && !dev
				? "../static/wasm/[modulehash].wasm"
				: "static/wasm/[modulehash].wasm";

		return config;
	},
};

export default nextConfig;

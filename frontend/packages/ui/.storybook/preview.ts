import type { Preview } from "@storybook/web-components";
import { html } from "lit";

const preview: Preview = {
	decorators: [
		(story) => {
			return html`
      <div style="font-family: 'Fira Code';">${story()}</div>
      `;
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;

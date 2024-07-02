import { html } from 'lit';
import '../components/AIChat';
export default {
    title: 'AIChat',
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        onOpen: { action: 'onClick' },
    },
    render: (args) => html `<ai-chat @click=${args.onOpen} name=${args.name}></ai-chat>`,
};
export const Default = {
    name: 'Default',
    args: {
        name: 'Lit',
    },
};

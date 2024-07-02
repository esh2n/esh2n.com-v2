import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../components/AIChat'

export default {
  title: 'AIChat',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onOpen: { action: 'onClick' },
  },
  render: (args) => html`<ai-chat @click=${args.onOpen} name=${args.name}></ai-chat>`,
} as Meta

export const Default: StoryObj = {
  name: 'Default',
  args: {
    name: 'Lit',
  },
}
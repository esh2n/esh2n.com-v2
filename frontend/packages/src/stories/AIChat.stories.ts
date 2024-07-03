import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'

import '../components/AIChat'

export default {
  title: 'AIChat',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    headerTxt: { control: { type: 'text' } },
    inputPlaceholder: { control: { type: 'text' } },
    messages: { control: { type: 'object' } },
  },
  render: (args) => html`
  <ai-chat 
    headerTxt=${args.headerTxt} 
    inputPlaceholder=${args.inputPlaceholder}>
    messages=${args.messages}
  </ai-chat>`,
} as Meta

export const Default: StoryObj = {
  name: 'Default',
  args: {
    headerTxt: 'もしかしてこのサイト、ターミナルが出せる...？',
    inputPlaceholder: '得意な言語は？',
    messages: [
      {id: 1, text: '駿也って何してる人？', sender: 'user'},
      {id: 2, text: "駿也は日本のエンジニアです。\n現在はブロックチェーンに携わっています。", sender: 'ai'},
    ],
  },
}
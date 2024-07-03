import { LitElement } from 'lit';
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    isContinuous?: boolean;
}
export declare class AIChat extends LitElement {
    static styles: import("lit").CSSResult;
    headerTxt: string;
    inputPlaceholder: string;
    inputMessage: string;
    messages: Message[];
    buttonIcon: string;
    iconFontFamily: string;
    render(): import("lit-html").TemplateResult<1>;
    updated(changedProperties: Map<string, unknown>): void;
    private handleInput;
    private handleKeyUp;
    private sendMessage;
}
export {};

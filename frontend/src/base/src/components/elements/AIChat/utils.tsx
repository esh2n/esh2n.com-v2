import { AIChat as LitAIChat } from "@esh2n.com/ui";
import { createComponent } from "@lit-labs/react";
import * as React from "react";

export const AIChatComponent = createComponent({
	tagName: "ai-chat",
	elementClass: LitAIChat,
	react: React,
});

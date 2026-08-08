import { getMemory } from "../config/llmMemory.js";
import { getModel } from "../config/llmModel.js";

export const chatAgent = async (state) => {
  const llm = getModel("chat");
  const history = await getMemory(state.conversationId)
  const messages = []
  const systemPrompt = `
  You are AgentVerse, An intelligent AI Assistant. 

  Rules:
  - For simple question, greetings and short queries, respond naturally in plain text.
  - for technical, educational, coding or detailed topics use Markdown.

  Formatting:
  - Use # for titles and ## for section
  - Leave a blank line after headings.
  - Use bullet points for lists.
  - Use numbered points for steps.
  - Use fenced code blocks with language tags for code.
  - Keep paragraphs short and readable.
  - Never write headings and content on the same line.
  - Never generate large walls of text.
  
  
  `;
  const response = await llm.invoke([
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "human",
      content: state.prompt,
    },
  ]);

  return {
    ...state,
    aiResponse: response.content,
  };
};

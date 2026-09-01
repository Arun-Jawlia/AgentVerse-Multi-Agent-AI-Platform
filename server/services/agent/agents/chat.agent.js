import {
  AIMessage,
  HumanMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getMemory } from "../config/llmMemory.js";
import { getModel } from "../config/llmModel.js";
import { deductCredits } from "../utils/deductCredits.js";

export const chatAgent = async (state) => {
  try {
    const llm = getModel("chat");
    const history = await getMemory(state.conversationId);

    const searchContext = state.searchResults
      ? `
    Web Search Results:
    ${JSON.stringify(state.searchResults)}
    Answer the user using only the above search results.
    `
      : "";

    const systemPrompt = `
  You are AgentVerse, An intelligent AI Assistant. 

  ${searchContext}

  if searchContext exists:

  - Use search results to answer
  - Do not mention internal tools

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
    const messages = [new SystemMessage(systemPrompt)];

    history.forEach((msg) => {
      if (msg.role === "user") {
        messages.push(new HumanMessage(msg.content));
      }
      if (msg.role === "assistant") {
        messages.push(new AIMessage(msg.content));
      }
    });

    messages.push(new HumanMessage(state.prompt));
    const response = await llm.invoke(messages);
    await deductCredits(state.userId, "chat");
    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: "Failed to generate response",
    };
  }
};

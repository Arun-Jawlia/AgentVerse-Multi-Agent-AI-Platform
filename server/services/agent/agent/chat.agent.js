import { getModel } from "../config/llmModel";

export const chatAgent = async (state) => {
  const llm = getModel("chat");
  const systemPrompt = "You are AgentVerse, An intelligent AI Assistant";
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

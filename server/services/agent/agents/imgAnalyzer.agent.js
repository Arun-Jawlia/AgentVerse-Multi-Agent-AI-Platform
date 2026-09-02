import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js";
import fs from "fs/promises";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const imgAnalyzerAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "image");
    const llm = await getModel("imgAnalyzer");

    const imageBuffer = await fs.readFile(state.file.path);
    const base64Image = imageBuffer.toString("base64");

    const SystemPrompt = `
        You are AgentVerseAI image analyser agent.

        Rules:
        - Analyze only the uploaded image
        - Answer the user's question accurately
        - If text exists in the image, extract it.
        - If charts or tables exits, explain them.
        - If something is unclear, say no.
        - Use Markdown when helpful
        - Do not hallucinate

        `;

    const messages = [
      new SystemMessage(SystemPrompt),
      new HumanMessage({
        content: [
          {
            type: "text",
            text: state.prompt || "Analyze the image",
          },
          {
            type: "image_url",
            image_url: {
              url: `data:${state.file.mimetype};base64,${base64Image}`,
            },
          },
        ],
      }),
    ];

    const response = await llm.invoke(messages);

    await deductCredits(state.userId, "vision");

    return {
      ...state,
      aiResponse: response.content,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: `${error?.data?.message || 'Failed to analyze image'}`,
    };
  } finally {
    await fs.unlink(state.file.path);
  }
};

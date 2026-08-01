import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";

const groq = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY
  // maxTokens: undefined,
  // maxRetries: 2,
  // other params...
});

const gemini = new ChatGoogle("gemini-2.5-flash");

export const getModel = async (agent) => {
  switch (agent) {
    case "chat":
      return groq;
    case "search":
      return groq;
    case "code":
      return gemini;

    default:
      return groq;
  }
};

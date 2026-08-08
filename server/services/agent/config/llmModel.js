import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";
import dotenv from 'dotenv'
dotenv.config()

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  temperature: 0,
  // maxTokens: undefined,
  // maxRetries: 2,
  // other params...
});

const gemini = new ChatGoogle("gemini-2.5-flash");

export const getModel = (agent) => {
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

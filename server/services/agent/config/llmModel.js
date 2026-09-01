import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";
import dotenv from "dotenv";
import { ChatOpenRouter } from "@langchain/openrouter";
dotenv.config();

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "openai/gpt-oss-120b",
  temperature: 0,
  // maxTokens: undefined,
  // maxRetries: 2,
  // other params...
});

const gemini = new ChatGoogle("gemini-3.5-flash");

const openrouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
});

export const getModel = (agent) => {
  switch (agent) {
    case "chat":
      return groq;
    case "search":
      return groq;
    case "code":
      return openrouter;
    case "pdfRag":
      return openrouter;
    case "imgAnalyzer":
      return gemini;

    default:
      return groq;
  }
};

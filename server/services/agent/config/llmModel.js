import { ChatGroq } from "@langchain/groq";
import { ChatGoogle } from "@langchain/google";

console.log(process.env.GROQ_API_KEY)

const groq = new ChatGroq({
  apiKey: 'GROQ_API_KEY',
  model: "openai/gpt-oss-120b",
  temperature: 0,
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

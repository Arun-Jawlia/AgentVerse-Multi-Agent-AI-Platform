import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import dotenv from 'dotenv'

dotenv.config()


export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-001",
});

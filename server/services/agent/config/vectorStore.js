import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "./embeddings.js";
import dotenv from "dotenv";

dotenv.config();

export const vectorStore = async (docs, collectionName) => {
  const vector_store = await QdrantVectorStore.fromExistingCollection(
    docs,
    embeddings,
    {
      url: process.env.QDRANT_URL,
      collectionName,
    },
  );

  return vector_store;
};

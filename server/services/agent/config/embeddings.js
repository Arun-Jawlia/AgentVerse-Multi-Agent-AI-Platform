import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv'

dotenv.config()


export const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

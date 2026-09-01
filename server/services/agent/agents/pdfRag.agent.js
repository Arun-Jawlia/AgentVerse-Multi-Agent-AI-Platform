import fs from "fs";
import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "../config/vectorStore.js";
import { getModel } from "../config/llmModel.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfRagAgent = async (state) => {
  try {
    const buffer = fs.readFileSync(state.file.path);
    const pdf = new PDFParse({
      data: buffer,
    });

    const result = pdf.getText();

    const texts = (await result).text;

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await splitter.createDocuments([texts]);

    const collectionName = `pdf-${Date.now()}`;

    const store = await vectorStore(docs, collectionName);

    const relevantDocs = await store.similaritySearch(state.prompt, 5);

    const context = relevantDocs.map((d) => d.pageContent).join("/n/n");

    const llm = await getModel("pdfRag");

    const systemPrompt = `
    You are AgentVerseAI PDF Assistant

    Rules:
    - Anwser ONLY from the uploaded pdf.
    - Never make up information.
    - If the answer is not present in the PDF, reply: "I could't find this information in the uploaded PDF."
    - Use Markdown formatting
    `;

    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(`
        Context: ${context}
        Question: ${state.prompt}
        `),
    ];

    const res = llm.invoke(messages);

    await deductCredits(state.userId,"pdf");

    return {
      ...state,
      aiResponse: res.content,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: `Failed to analyze PDF {error.message}`,
    };
  } finally {
    fs.unlinkSync(state.file.path);
  }
};

import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { imageGenAgent } from "../agents/vision.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { codingAgent } from "../agents/coding.agent.js";
import { pdfRagAgent } from "../agents/pdfRag.agent.js";
import { imgAnalyzerAgent } from "../agents/imgAnalyzer.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);

workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("vision", imageGenAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("code", codingAgent);
workflow.addNode("pdfRag", pdfRagAgent);
workflow.addNode("imgAnalyzer", imgAnalyzerAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
      case "search":
        return "search";
      case "code":
        return "code";
      case "pdf":
        return "pdf";
      case "ppt":
        return "ppt";
      case "vision":
        return "vision";
      case "pdfRag":
        return "pdfRag";
      case "imgAnalyzer":
        return "imgAnalyzer";
      default:
        return "chat";
    }
  },
  {
    chat: "chat",
    search: "search",
    vision: "vision",
    code: "code",
    pdf: "pdf",
    ppt: "ppt",
    pdfRag: "pdfRag",
    imgAnalyzer: "imgAnalyzer",
  },
);

workflow.addEdge("search", "chat");
workflow.addEdge("chat", "__end__");
workflow.addEdge("code", "__end__");
workflow.addEdge("pdf", "__end__");
workflow.addEdge("ppt", "__end__");
workflow.addEdge("vision", "__end__");
workflow.addEdge("pdfRag", "__end__");
workflow.addEdge("imgAnalyzer", "__end__");

export const graph = workflow.compile();

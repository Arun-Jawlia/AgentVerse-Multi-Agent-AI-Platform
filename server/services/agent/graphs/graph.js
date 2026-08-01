import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { imageGenAgent } from "../agents/vision.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { codingAgent } from "../agents/coding.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);


workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("vision", imageGenAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("code", codingAgent);

workflow.addEdge("__start__", "router");
workflow.addConditionalEdges(
  "router",
  (state) => {
    switch (state.agent) {
      case "chat":
        return "chat";
        break;
      case "search":
        return "search";
        break;
      case "code":
        return "code";
        break;
      case "pdf":
        return "pdf";
        break;
      case "ppt":
        return "ppt";
        break;
      case "vision":
        return "vision";
        break;

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
  },
);


workflow.addEdge("search", 'chat')
workflow.addEdge('chat', '__end__')
workflow.addEdge('coding', '__end__')
workflow.addEdge('pdf', '__end__')
workflow.addEdge('ppt', '__end__')
workflow.addEdge('vision', '__end__')


export const graph = workflow.compile()

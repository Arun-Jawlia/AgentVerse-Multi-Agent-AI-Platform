import { getModel } from "../config/llmModel.js";

export const router = async (state) => {
  if (state.agent && state.agent != "auto") {
    return {
      ...state,
      agent: state.agent.toLowerCase(),
    };
  }

  if (state.file.mimetype == "application/pdf") {
    return {
      ...state,
      agent: "pdfRag",
    };
  }
  if (state.file.mimetype.startswith("image/")) {
    return {
      ...state,
      agent: "imageAnalyzer",
    };
  }

  const llm = await getModel("router");

  const prompt = `
    You are an agent router.

    Available agents:
    - chat
    - search
    - code
    - pdf
    - ppt
    - vision

    Rules:

    chat: 
    General conversation,
    explanations,
    learning,
    questions.

    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.

    code:
    Generate code,
    debug code,
    build projects,
    architectures,
    API design.

    vision:
    Generate image,
    Create image.

    pdf:
    Question about generate PDFs
    or document context.

    ppt:
    Question about generate PPTs
    or ppt context.

    return only one word:

    chat
    search
    code
    pdf
    ppt
    vision

    User Query: ${state.prompt}
    `;

  const response = await llm.invoke(prompt);
  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};

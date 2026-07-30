import { getModel } from "../config/llmModel";

export const router = async (state) => {
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
    console.log(response)
  return {
    ...state,
    agent: response.content.trim().toLowerCase(),
  };
};

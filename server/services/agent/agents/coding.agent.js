import { ChatOpenRouter } from "@langchain/openrouter";
import { getModel } from "../config/llmModel.js";

export const codingAgent = async (state) => {
  const intentLLM = await getModel("intent");
  const llm = await getModel("code");

  const intentResponse = await intentLLM.invoke(
    `
        You are a intent classifier.

        Return ONLY one of these values.

        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION
        DEBUGGING
        CONVERSATION
        DOCUMENTATION

        User Request:
        ${state.prompt}
    `,
  );

  const intent = intentResponse.content;
  console.log("Intent Result", intent);

  if (intent == "CODE_GENERATION") {
    const prompt = `
        You are AgentVerse Coding Agent.

        Generate the requested project.

        Default stack:
        - HTML
        - CSS
        - JavaScript

        Use React / Next.js / Vue ONLY if explicitly requested

        Rules:
        - Responsive 
        - Modern UI
        - CSS Variables
        - Flexbox / Grid
        - Smooth Scroll
        - Hover Effects
        - Beautiful Spacing
        - Single Page unless user ask otherwise.

        IMAGES 
        ================================

        Always use real Unsplash Images.

        Never use placeholders.

        Return ONLY valid JSON.

        Schema: 
        {
            "files" : [
            {
            "name" : 'index.html',
            "content" : '...'
            }, 
            {
            "name" : 'style.css',
            "content" : '...'
            }, 
            {
            "name" : 'script.js',
            "content" : '...'
            }, 
            
            ]
        }

        Rules:
        - Output must start with {
        - Output must end with }
        - No markdown
        - No Explanation
        - No Extra text
        - No code fences
        - Never mention intent
        - All JSON strings must be properly escaped
        - Use double quotes for JSON keys and string values


        User Request:
        ${state.prompt}
        
    `;

    const res = await llm.invoke(prompt);
    console.log(res)
    const content = JSON.parse(res.content);

    return {
      ...state,
      aiResponse: "Code generated successfully",
      artifacts: [
        {
          id: Date.now(),
          type: "Project",
          files: content.files || [],
          title: state.prompt
        },
      ],
    };
  }

  const res = await llm.invoke(`
        The user's request is:
        ${intent}

        Return Markdown only.
        Never generate project files.
        Use Headings like:
        # Overview
        ## Explanation
        ## Problems
        ## Improvements
        ## Best Practices
        ## Optimized Code (if needed)

        User Request:
        ${state.prompt}
    `);

  return {
    ...state,
    aiResponse: res.data,
    artifacts: [],
  };
};

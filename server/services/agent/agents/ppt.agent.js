import { getModel } from "../config/llmModel.js";

export const pptAgent = async (state) => {
  try {
    const llm = await getModel("ppt");

    const prompt = `
        You are a  professional presentation designer.
        
        Return ONLY valid JSON.

        Format: 
            {
                "title":"",
                "subtitle":"",
                "slides":
                    [
                        {
                            "title":"",
                            "points": [
                                "",
                                "",
                                "",
                                "",
                                ""
                            ]
                        }
                    ]
            Rules:
            - Generate Exactly 6 content slides.
            - Each Slide should have 4-6 concise bullet points
            - No markdown
            - No code block
            - Return ONLY JSON.

            Topic:

            ${state.prompt}
            }
        `;

    const res = await llm.invoke(prompt)
    const data = JSON.parse(res.content)
    
  } catch (error) {


  }
};

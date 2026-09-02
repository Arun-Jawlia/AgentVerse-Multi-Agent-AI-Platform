import { checkAgentLimit } from "../config/agentLimit.js";
import { getModel } from "../config/llmModel.js";
import { deductCredits } from "../utils/deductCredits.js";
import { generatePDF } from "../utils/generatePdf.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pdfAgent = async (state) => {
  try {
    await checkAgentLimit(state.userId, "pdf");
    const llm = await getModel("pdf");
    const prompt = `
            You are an Expert Document Writer.

            Return ONLY valid JSON

            Do NOT return markdown.

            Do Not return explanations

            Structure: {
                "title":"",
                "subtitle":"",
                "sections":[
                    {
                        "heading":"",
                        "points":[]
                    }    
                ]
            }
            
            Generate 4-8 sections

            Each sesction should have 3-6 concise bullet points>

            Topic:

            ${state.prompt}
        
        `;

    const res = await llm.invoke(prompt);
    await deductCredits(state.userId, "pdf");

    const data = JSON.parse(res.content);

    const pdfBuffer = await generatePDF(data);

    const filename = `pdf-${Date.now()}.pdf`;

    await uploadToS3(filename, pdfBuffer, "application/pdf");

    const downloadURL = await getFromS3(filename, 24 * 60);

    return {
      ...state,
      aiResponse: `
            # PDF Generated

            **${data.title}**
            📩 [Download PDF](${downloadURL})

            _Link expires in 10 minutes
            `,
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: `${error?.data?.message || 'Failed to generate PDF'}`,
    };
  }
};

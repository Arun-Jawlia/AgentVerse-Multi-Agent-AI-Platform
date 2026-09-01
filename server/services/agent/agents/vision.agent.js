import { getModel } from "../config/llmModel.js";
import axios from "axios";
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { deductCredits } from "../utils/deductCredits.js";

export const imageGenAgent = async (state) => {
  try {
    const llm = await getModel("vision");
    const res = await llm.invoke(
      `
        You are an Elite AI image prompt engineer.
        Convert the user request into a highly detailed image generation prompt.

        Requirements:
        - Cinematic lighting
        - Professional Composition
        - Ultra realistic
        - Beautiful color palette
        - Sharp focus
        - 8k Quality
        - Photorealistic
        - Depth of Field
        - Profession photography
        - Stunning visuals

        Return ony the image prompt.

        User Request:
        ${state.prompt}
        `,
    );

    const prompt = res.content.trim();
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    const imageRes = await axios.get(imageUrl, { responseType: "arraybuffer" });

    // console.log(imageRes);
    await deductCredits(state.userId, "vision");

    const buffer = Buffer.from(imageRes?.data);
    const filename = `${Date.now()}.png`;

    await uploadToS3(filename, buffer, "image/png");

    const downloadUrl = await getFromS3(filename, 24 * 60 * 60);

    const customiseRes = `
    ![Generated Image](${downloadUrl})

    [Download Image](${downloadUrl})

    ⌛Link expires in 10 minutes.
  
    `;

    return {
      ...state,
      aiResponse: customiseRes,
    };
  } catch (error) {
    console.log(error);
    return {
      ...state,
      aiResponse: "❌ Failed to generate image",
    };
  }
};

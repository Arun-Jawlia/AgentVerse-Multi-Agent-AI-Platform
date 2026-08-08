import { addMessage } from "../config/llmMemory.js";
import { graph } from "../graphs/graph.js";
import axios from "axios";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId } = req.body;
    
    await addMessage(conversationId,'user', prompt)

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    const result = await graph.invoke({
      prompt,
      conversationId,
    });

    const response = result.aiResponse;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
    });
    await addMessage(conversationId,'assistant', response)
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: `agent error: ${error}`,
    });
  }
};

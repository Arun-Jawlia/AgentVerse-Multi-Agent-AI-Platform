import redis from "../../../shared/redis/redis.js";
import { addMessage } from "../config/llmMemory.js";
import { graph } from "../graphs/graph.js";
import axios from "axios";

export const agent = async (req, res) => {
  try {
    const { prompt, conversationId, agent } = req.body;

    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,
    });

    await addMessage(conversationId, "user", prompt);
    const result = await graph.invoke({
      prompt,
      conversationId,
      agent,
    });

    const response = result.aiResponse;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      images: result.images,
      artifacts: result.artifacts
    });
    await addMessage(conversationId, "assistant", response);

    // console.log(response)
    return res.status(200).json({
      answer: response,
      images: result.images || [],
      artifacts: result.artifacts || []
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `agent error: ${error}`,
    });
  }
};

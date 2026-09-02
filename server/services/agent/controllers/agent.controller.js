import redis from "../../../shared/redis/redis.js";
import { addMessage } from "../config/llmMemory.js";
import { graph } from "../graphs/graph.js";
import axios from "axios";

export const agent = async (req, res, next) => {
  try {
    const { prompt, conversationId, agent } = req.body;
    const file = req.file;
    const userId = req.headers["x-user-id"];

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
      userId,
      file,
    });

    const response = result.aiResponse;
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      images: result.images,
      artifacts: result.artifacts,
    });
    await addMessage(conversationId, "assistant", response);

    console.log(response);
    return res.status(200).json({
      answer: response,
      images: result.images || [],
      artifacts: result.artifacts || [],
    });
  } catch (error) {
    next(error);
  }
};

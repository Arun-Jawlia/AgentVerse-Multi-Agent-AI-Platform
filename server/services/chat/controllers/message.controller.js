import Message from "../models/message.model.js";

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content } = req.body;

    const message = await Message.create({
      conversationId,
      role,
      content,
    });
    return res.status(500).json({
      message: `message created`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `save message controller: ${error}`,
    });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId,
    }).sort({ createdAt: -1 });
    return res.status(500).json(messages);
  } catch (error) {
    return res.status(500).json({
      message: `get message controller: ${error}`,
    });
  }
};

import Message from "../models/message.model.js";

export const saveMessage = async (req, res) => {
  try {
    const { conversationId, role, content, images, artifacts } = req.body;

    const message = await Message.create({
      conversationId,
      role,
      content,
      images,
      artifacts
    });
    return res.status(200).json({
      message: `message created`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `save message controller: ${error.message}`,
    });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({
      conversationId,
    })
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({
      message: `get message controller: ${error.message}`,
    });
  }
};

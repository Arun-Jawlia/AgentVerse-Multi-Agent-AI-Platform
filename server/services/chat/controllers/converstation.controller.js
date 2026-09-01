import Conversation from "../models/converstation.model.js";

export const createConverstation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    const converstation = await Conversation.create({
      userId: userId,
    });
    return res.status(200).json(converstation);
  } catch (error) {
    return res.status(500).json({
      message: `create converstation Controller: ${error.message}`,
    });
  }
};
export const getConverstation = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    const converstations = await Conversation.find({
      userId: userId,
    }).sort({ updatedAt: -1 });
    return res.status(200).json(converstations);
  } catch (error) {
    return res.status(500).json({
      message: `get converstation Controller: ${error.message}`,
    });
  }
};
export const updateConverstationTitle = async (req, res) => {
  try {
    const { id, title } = req.body;

    const converstation = await Conversation.findByIdAndUpdate(id, {
      title,
    });
    return res.status(200).json(converstation);
  } catch (error) {
    return res.status(500).json({
      message: `update converstation title Controller: ${error.message}`,
    });
  }
};

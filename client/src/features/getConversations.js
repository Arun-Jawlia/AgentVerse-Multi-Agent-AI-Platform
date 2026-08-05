import { api } from "../apis/axios";

export const getConversations = async () => {
  try {
    const { data } = await api.get("/api/chat/get-conversation");
    return data;
  } catch (error) {
    console.log(error);
    return []
  }
};



import { api } from "../apis/axios";

export const startChat = async (payload) => {
  try {
    const { data } = await api.post("/api/agent/chat", payload);
    return data
  } catch (error) {
    console.log(error);
    return null
  }
};

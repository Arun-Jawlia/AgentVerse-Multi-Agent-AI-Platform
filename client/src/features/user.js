import { api } from "../apis/axios";

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/api/me");
    return data
  } catch (error) {
    console.log(error);
    return null
  }
};


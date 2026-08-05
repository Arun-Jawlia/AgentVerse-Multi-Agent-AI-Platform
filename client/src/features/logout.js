import { api } from "../apis/axios";

export const logout = async () => {
  try {
    const { data } = await api.get("/api/auth/logout");
    return data
  } catch (error) {
    console.log(error);
    return null
  }
};

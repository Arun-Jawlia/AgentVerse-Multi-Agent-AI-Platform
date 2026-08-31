import { api } from "../apis/axios";

export const createOrder = async (plan) => {
  try {
    const { data } = await api.post("/api/billing/create", {plan});
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const verifyPayment = async (payload) => {
  try {
    const { data } = await api.post("/api/billing/verify", payload);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

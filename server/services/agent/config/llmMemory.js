import redis from "../../../shared/redis/redis.js";
import { getMessages } from "../utils/getMessage.js";

export const getMemory = async (conversationId) => {
  const key = `messages-${conversationId}`;
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }

  const messages = await getMessages(conversationId);

  const history = messages || [];
  await redis.set(key, JSON.stringify(history), "EX", 24 * 60 * 60);

  return history;
};

export const addMessage = async (conversationId, role, content) => {
  const key = `messages-${conversationId}`;
  const rawMessages = await redis.get(key);
  const messages = rawMessages ? JSON.parse(rawMessages) : [];

  messages.push({
    role,
    content,
  });

  // if (messages.length > 20) {
  //   messages.shift();
  // }
  if (messages.length > 20) {
    messages.splice(0, messages.length - 20);
  }

  await redis.set(key, JSON.stringify(messages));
};

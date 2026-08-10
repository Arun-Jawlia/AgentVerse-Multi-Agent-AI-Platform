

export const clearMemory = async (conversationId) => {
  const key = `messages-${conversationId}`;
  await redis.del(key);
};
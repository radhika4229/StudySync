import { api } from "./api";

export type AIQueryType = "EXPLAIN" | "QUIZ" | "SUMMARIZE" | "INTERVIEW";

export const aiService = {
  // Per-room AI ask (used by chat @ai)
  ask: async (roomId: string, prompt: string): Promise<{ content: string }> => {
    const { data } = await api.post(`/ai/rooms/${roomId}/ask`, { prompt });
    return data;
  },
  // Generic AI query used by the AI Assistant tab
  query: async (question: string, queryType: AIQueryType): Promise<string> => {
    const res = await api.post(`/ai/query`, { question, queryType });
    // Spring's wrapped response: { data: "..." }
    return res.data?.data ?? res.data?.content ?? "";
  },
};

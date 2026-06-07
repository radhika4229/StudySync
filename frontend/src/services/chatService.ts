import { api } from "./api";

export type ChatMessageType = "TEXT" | "SYSTEM" | "AI_RESPONSE" | "EMOJI";

export interface ChatSender {
  id: string;
  username?: string;
  fullName?: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  type: ChatMessageType;
  sender?: ChatSender;
  createdAt: string;
  [k: string]: unknown;
}

export const chatService = {
  history: async (roomId: string, page = 0, size = 50): Promise<ChatMessage[]> => {
    const { data } = await api.get(`/chat/rooms/${roomId}/messages`, { params: { page, size } });
    // backend may return Page<> or array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
  },
  send: async (roomId: string, content: string, type: ChatMessageType = "TEXT"): Promise<ChatMessage> => {
    const { data } = await api.post(`/chat/rooms/${roomId}/messages`, { content, type });
    return data;
  },
};

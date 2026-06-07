import { api } from "./api";

export interface StudySession {
  id: string;
  roomId: string;
  startTime: string;
  endTime?: string | null;

  startedBy?: {
    id: number;
    username?: string;
    fullName?: string;
  };

  participants?: Array<{
    id: number;
    username?: string;
    fullName?: string;
  }>;
}
export const sessionService = {
  active: async (roomId: string): Promise<StudySession | null> => {
    try {
      const { data } = await api.get(`/sessions/rooms/${roomId}/active`);

      // Backend returns:
      // { success:true, message:null, data:{...session} }

      return data?.data || null;
    } catch (e: any) {
      if (e?.response?.status === 404) {
        return null;
      }
      throw e;
    }
  },

  start: async (roomId: string): Promise<StudySession> => {
    const { data } = await api.post(`/sessions/rooms/${roomId}/start`);

    return data.data;
  },

  end: async (sessionId: string): Promise<StudySession> => {
    const { data } = await api.put(`/sessions/${sessionId}/end`);

    return data.data;
  },

  join: async (sessionId: string): Promise<StudySession> => {
    const { data } = await api.post(`/sessions/${sessionId}/join`);

    return data.data;
  },

  leave: async (sessionId: string): Promise<StudySession> => {
    const { data } = await api.delete(`/sessions/${sessionId}/leave`);

    return data.data;
  },
};
import { api } from "./api";

export interface Note {
  id: string;
  roomId?: string;
  title: string;
  content: string;
  updatedAt?: string;
  createdAt?: string;
  updatedBy?: { id: string; username?: string };
}

const unwrap = <T,>(data: any): T => (data?.data !== undefined ? data.data : data);

export const notesService = {
  list: async (roomId: string): Promise<Note[]> => {
    const { data } = await api.get(`/notes/rooms/${roomId}`);
    const out = unwrap<any>(data);
    if (Array.isArray(out)) return out;
    if (out && typeof out === "object" && "id" in out) return [out as Note];
    return [];
  },
  create: async (roomId: string, title: string): Promise<Note> => {
    const { data } = await api.post(`/notes/rooms/${roomId}`, { title, content: "" });
    return unwrap<Note>(data);
  },
  update: async (noteId: string, payload: { title?: string; content?: string }): Promise<Note> => {
    const { data } = await api.put(`/notes/${noteId}`, payload);
    return unwrap<Note>(data);
  },
  exportPdf: async (noteId: string): Promise<Blob> => {
    const res = await api.get(`/notes/${noteId}/export/pdf`, { responseType: "blob" });
    return res.data;
  },
};

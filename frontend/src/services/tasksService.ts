import { api } from "./api";

export type TaskPriority = "HIGH" | "MEDIUM" | "LOW";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority?: TaskPriority;
  dueDate?: string | null;
  roomId?: string;
  assigneeId?: string;
}

const unwrap = <T,>(data: any): T => (data?.data !== undefined ? data.data : data);

export const tasksService = {
  list: async (roomId: string): Promise<Task[]> => {
    const { data } = await api.get(`/tasks/rooms/${roomId}`);
    const out = unwrap<any>(data);
    return Array.isArray(out) ? out : [];
  },
  create: async (
    roomId: string,
    payload: { title: string; priority: TaskPriority; dueDate: string | null }
  ): Promise<Task> => {
    const { data } = await api.post(`/tasks/rooms/${roomId}`, payload);
    return unwrap<Task>(data);
  },
  complete: async (taskId: string): Promise<Task> => {
    const { data } = await api.put(`/tasks/${taskId}/complete`);
    return unwrap<Task>(data);
  },
  remove: async (taskId: string): Promise<void> => {
    await api.delete(`/tasks/${taskId}`);
  },
};

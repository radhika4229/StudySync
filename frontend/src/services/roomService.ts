import { api } from "./api";

export type RoomStatus = "ACTIVE" | "INACTIVE" | "ARCHIVED";
export type RoomVisibility = "PUBLIC" | "PRIVATE";

export interface RoomOwner {
    id?: string;
    username?: string;
    fullName?: string;
    avatarUrl?: string;
}

export interface Room {
    id: string;
    name: string;
    subject?: string;
    topic?: string;
    description?: string;
    code?: string;
    roomCode?: string;

    memberCount?: number;
    currentParticipants?: number;

    maxParticipants?: number;
    status?: RoomStatus;
    visibility?: RoomVisibility;

    passwordProtected?: boolean;
    owner?: RoomOwner;

    [key: string]: unknown;
}

export interface CreateRoomPayload {
    name: string;
    subject: string;
    topic?: string;
    description?: string;
    visibility: RoomVisibility;
    maxParticipants: number;
    passwordProtected: boolean;
    roomPassword?: string;
}

export const roomService = {
    myRooms: async (): Promise<Room[]> => {
        const response = await api.get("/rooms/my");
        return response.data?.data ?? [];
    },

    publicRooms: async (): Promise<Room[]> => {
        const response = await api.get("/rooms");
        return response.data?.data ?? [];
    },

    recommend: async (subject: string): Promise<Room[]> => {
        const response = await api.get("/rooms/recommend", {
            params: { subject },
        });

        return response.data?.data ?? [];
    },

    join: async (roomCode: string, password?: string): Promise<Room> => {
        const response = await api.post(
            `/rooms/${encodeURIComponent(roomCode)}/join`,
            null,
            {
                params: password ? { password } : undefined,
            }
        );

        return response.data?.data;
    },

    create: async (payload: CreateRoomPayload): Promise<Room> => {
        const response = await api.post("/rooms", payload);

        return response.data?.data;
    },
};

export const SUBJECTS = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Biology",
    "History",
    "Literature",
    "Economics",
    "Languages",
    "Other",
] as const;
import { useEffect, useRef } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import toast from "react-hot-toast";
import { WS_BASE_URL } from "@/services/api";

export interface RoomSocketHandlers {
  onChat?: (msg: any) => void;
  onSession?: (data: any) => void;
  onNotes?: (data: any) => void;
  onTasks?: (data: any) => void;
}

export function useRoomWebSocket(
    roomId: string | undefined,
    handlers: RoomSocketHandlers
) {
  const clientRef = useRef<Client | null>(null);
  const handlersRef = useRef(handlers);

  handlersRef.current = handlers;

  useEffect(() => {
    if (!roomId) return;

    const token = localStorage.getItem("access_token");

    console.log("WS_BASE_URL:", WS_BASE_URL);
    console.log("ROOM_ID:", roomId);

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_BASE_URL),

      connectHeaders: token
          ? {
            Authorization: `Bearer ${token}`,
          }
          : {},

      reconnectDelay: 5000,
      debug: (msg) => console.log("[STOMP]", msg),

      onConnect: () => {
        console.log("✅ WebSocket Connected");

        const subscribe = (
            destination: string,
            callback?: (data: any) => void
        ) => {
          client.subscribe(destination, (message: IMessage) => {
            try {
              callback?.(JSON.parse(message.body));
            } catch (error) {
              console.error(
                  `Failed to parse message from ${destination}`,
                  error
              );
            }
          });
        };

        subscribe(
            `/topic/room/${roomId}/chat`,
            handlersRef.current.onChat
        );

        subscribe(
            `/topic/room/${roomId}/session`,
            handlersRef.current.onSession
        );

        subscribe(
            `/topic/room/${roomId}/tasks`,
            handlersRef.current.onTasks
        );

        subscribe(
            `/topic/room/${roomId}/notes`,
            (data) => {
              handlersRef.current.onNotes?.(data);

              if (data?.user) {
                toast(`${data.user} updated notes`);
              }
            }
        );
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
      },

      onWebSocketError: (event) => {
        console.error("❌ WebSocket Error:", event);
      },

      onWebSocketClose: () => {
        console.warn("⚠️ WebSocket Closed");
        toast("Reconnecting...", { icon: "🔄" });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🔌 Disconnecting WebSocket");
      client.deactivate();
      clientRef.current = null;
    };
  }, [roomId]);

  return clientRef;
}
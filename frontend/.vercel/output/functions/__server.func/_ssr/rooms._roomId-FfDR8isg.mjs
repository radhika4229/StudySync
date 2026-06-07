import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { z as zt } from "../_libs/react-hot-toast.mjs";
import { R as Route$1, u as useAuthStore, W as WS_BASE_URL, a as api } from "./router-Bov4sYtq.mjs";
import { D as Dialog, f as DialogTrigger, a as DialogContent, b as DialogHeader, c as DialogTitle, e as DialogFooter } from "./dialog-C9_4GAP6.mjs";
import { T as Textarea, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DPPaF8nK.mjs";
import { B as Button, c as cn, b as buttonVariants } from "./button-BXrfXN_b.mjs";
import { S as SockJS } from "../_libs/sockjs-client.mjs";
import { I as Input } from "./input-DwaGuH4D.mjs";
import { R as Root2, T as Trigger, P as Portal, C as Content2 } from "../_libs/radix-ui__react-popover.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-c5KQ8wMi.mjs";
import { P as ProtectedRoute } from "./ProtectedRoute-DGZFG5uG.mjs";
import { L as LoaderCircle, p as ArrowLeft, y as Copy, U as Users, z as Smile, D as Send, E as Play, H as Square, I as Crown, J as Clipboard, P as Plus, K as Download, d as Calendar$1, N as Trash2, O as ChevronLeft, v as ChevronRight, Q as ChevronDown } from "../_libs/lucide-react.mjs";
import { C as Client } from "../_libs/stomp__stompjs.mjs";
import { f as format } from "../_libs/date-fns.mjs";
import { M as Markdown } from "../_libs/react-markdown.mjs";
import { g as getDefaultClassNames, D as DayPicker } from "../_libs/react-day-picker.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "crypto";
import "async_hooks";
import "util";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/goober.mjs";
import "../_libs/axios.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/zustand.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/url-parse.mjs";
import "../_libs/requires-port.mjs";
import "../_libs/querystringify.mjs";
import "../_libs/inherits.mjs";
import "../_libs/faye-websocket.mjs";
import "../_libs/websocket-driver.mjs";
import "../_libs/safe-buffer.mjs";
import "buffer";
import "../_libs/http-parser-js.mjs";
import "../_libs/websocket-extensions.mjs";
import "../_libs/eventsource.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/devlop.mjs";
import "../_libs/unified.mjs";
import "../_libs/bail.mjs";
import "../_libs/extend.mjs";
import "../_libs/is-plain-obj.mjs";
import "../_libs/trough.mjs";
import "../_libs/vfile.mjs";
import "../_libs/vfile-message.mjs";
import "../_libs/unist-util-stringify-position.mjs";
import "node:process";
import "node:path";
import "node:url";
import "../_libs/remark-parse.mjs";
import "../_libs/mdast-util-from-markdown.mjs";
import "../_libs/micromark-util-decode-numeric-character-reference+[...].mjs";
import "../_libs/micromark-util-decode-string.mjs";
import "../_libs/decode-named-character-reference+[...].mjs";
import "../_libs/character-entities.mjs";
import "../_libs/micromark-util-normalize-identifier+[...].mjs";
import "../_libs/micromark.mjs";
import "../_libs/micromark-util-combine-extensions+[...].mjs";
import "../_libs/micromark-util-chunked.mjs";
import "../_libs/micromark-factory-space.mjs";
import "../_libs/micromark-util-character.mjs";
import "../_libs/micromark-core-commonmark.mjs";
import "../_libs/micromark-util-classify-character+[...].mjs";
import "../_libs/micromark-util-resolve-all.mjs";
import "../_libs/micromark-util-subtokenize.mjs";
import "../_libs/micromark-factory-destination.mjs";
import "../_libs/micromark-factory-label.mjs";
import "../_libs/micromark-factory-title.mjs";
import "../_libs/micromark-factory-whitespace.mjs";
import "../_libs/micromark-util-html-tag-name.mjs";
import "../_libs/mdast-util-to-string.mjs";
import "../_libs/remark-rehype.mjs";
import "../_libs/mdast-util-to-hast.mjs";
import "../_libs/ungap__structured-clone.mjs";
import "../_libs/micromark-util-sanitize-uri.mjs";
import "../_libs/unist-util-position.mjs";
import "../_libs/trim-lines.mjs";
import "../_libs/unist-util-visit.mjs";
import "../_libs/unist-util-visit-parents.mjs";
import "../_libs/unist-util-is.mjs";
import "../_libs/hast-util-to-jsx-runtime.mjs";
import "../_libs/comma-separated-tokens.mjs";
import "../_libs/property-information.mjs";
import "../_libs/space-separated-tokens.mjs";
import "../_libs/style-to-js.mjs";
import "../_libs/style-to-object.mjs";
import "../_libs/inline-style-parser.mjs";
import "../_libs/hast-util-whitespace.mjs";
import "../_libs/estree-util-is-identifier-name.mjs";
import "../_libs/html-url-attributes.mjs";
import "../_libs/date-fns__tz.mjs";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      ),
      captionLayout,
      formatters: {
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters
      },
      classNames: {
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames
      },
      components: {
        Root: ({ className: className2, rootRef, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-slot": "calendar", ref: rootRef, className: cn(className2), ...props2 });
        },
        Chevron: ({ className: className2, orientation, ...props2 }) => {
          if (orientation === "left") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 });
          }
          if (orientation === "right") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: cn("size-4", className2), ...props2 });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("size-4", className2), ...props2 });
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props2 }) => {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...props2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-(--cell-size) items-center justify-center text-center", children }) });
        },
        ...components
      },
      ...props
    }
  );
}
function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      ref,
      variant: "ghost",
      size: "icon",
      "data-day": day.date.toLocaleDateString(),
      "data-selected-single": modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle,
      "data-range-start": modifiers.range_start,
      "data-range-end": modifiers.range_end,
      "data-range-middle": modifiers.range_middle,
      className: cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      ),
      ...props
    }
  );
}
const chatService = {
  history: async (roomId, page = 0, size = 50) => {
    const { data } = await api.get(`/chat/rooms/${roomId}/messages`, { params: { page, size } });
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.content)) return data.content;
    return [];
  },
  send: async (roomId, content, type = "TEXT") => {
    const { data } = await api.post(`/chat/rooms/${roomId}/messages`, { content, type });
    return data;
  }
};
const sessionService = {
  active: async (roomId) => {
    try {
      const { data } = await api.get(`/sessions/rooms/${roomId}/active`);
      return data?.data || null;
    } catch (e) {
      if (e?.response?.status === 404) {
        return null;
      }
      throw e;
    }
  },
  start: async (roomId) => {
    const { data } = await api.post(`/sessions/rooms/${roomId}/start`);
    return data.data;
  },
  end: async (sessionId) => {
    const { data } = await api.put(`/sessions/${sessionId}/end`);
    return data.data;
  },
  join: async (sessionId) => {
    const { data } = await api.post(`/sessions/${sessionId}/join`);
    return data.data;
  },
  leave: async (sessionId) => {
    const { data } = await api.delete(`/sessions/${sessionId}/leave`);
    return data.data;
  }
};
const unwrap$1 = (data) => data?.data !== void 0 ? data.data : data;
const notesService = {
  list: async (roomId) => {
    const { data } = await api.get(`/notes/rooms/${roomId}`);
    const out = unwrap$1(data);
    if (Array.isArray(out)) return out;
    if (out && typeof out === "object" && "id" in out) return [out];
    return [];
  },
  create: async (roomId, title) => {
    const { data } = await api.post(`/notes/rooms/${roomId}`, { title, content: "" });
    return unwrap$1(data);
  },
  update: async (noteId, payload) => {
    const { data } = await api.put(`/notes/${noteId}`, payload);
    return unwrap$1(data);
  },
  exportPdf: async (noteId) => {
    const res = await api.get(`/notes/${noteId}/export/pdf`, { responseType: "blob" });
    return res.data;
  }
};
const unwrap = (data) => data?.data !== void 0 ? data.data : data;
const tasksService = {
  list: async (roomId) => {
    const { data } = await api.get(`/tasks/rooms/${roomId}`);
    const out = unwrap(data);
    return Array.isArray(out) ? out : [];
  },
  create: async (roomId, payload) => {
    const { data } = await api.post(`/tasks/rooms/${roomId}`, payload);
    return unwrap(data);
  },
  complete: async (taskId) => {
    const { data } = await api.put(`/tasks/${taskId}/complete`);
    return unwrap(data);
  },
  remove: async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
  }
};
const aiService = {
  // Per-room AI ask (used by chat @ai)
  ask: async (roomId, prompt) => {
    const { data } = await api.post(`/ai/rooms/${roomId}/ask`, { prompt });
    return data;
  },
  // Generic AI query used by the AI Assistant tab
  query: async (question, queryType) => {
    const res = await api.post(`/ai/query`, { question, queryType });
    return res.data?.data ?? res.data?.content ?? "";
  }
};
function useRoomWebSocket(roomId, handlers) {
  const clientRef = reactExports.useRef(null);
  const handlersRef = reactExports.useRef(handlers);
  handlersRef.current = handlers;
  reactExports.useEffect(() => {
    if (!roomId) return;
    const token = localStorage.getItem("access_token");
    console.log("WS_BASE_URL:", WS_BASE_URL);
    console.log("ROOM_ID:", roomId);
    const client = new Client({
      webSocketFactory: () => new SockJS(WS_BASE_URL),
      connectHeaders: token ? {
        Authorization: `Bearer ${token}`
      } : {},
      reconnectDelay: 5e3,
      debug: (msg) => console.log("[STOMP]", msg),
      onConnect: () => {
        console.log("✅ WebSocket Connected");
        const subscribe = (destination, callback) => {
          client.subscribe(destination, (message) => {
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
              zt(`${data.user} updated notes`);
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
        zt("Reconnecting...", { icon: "🔄" });
      }
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
const Popover = Root2;
const PopoverTrigger = Trigger;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2.displayName;
const EMOJIS = ["😀", "😂", "🔥", "💡", "👍", "🎯", "📚", "✅", "🚀", "💪", "🤔", "😅", "🙌", "❤️", "⭐", "🎉", "👏", "💯", "🤖", "📝"];
const initials = (name) => (name || "?").split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
const isSingleEmoji = (s) => {
  const t = s.trim();
  if (!t) return false;
  return t.length <= 4 && !/[a-zA-Z0-9]/.test(t);
};
function RoomPage() {
  const {
    roomId
  } = Route$1.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const currentUser = useAuthStore((s) => s.user);
  const roomQ = useQuery({
    queryKey: ["room", roomId],
    queryFn: async () => (await api.get(`/rooms/${roomId}`)).data
  });
  const historyQ = useQuery({
    queryKey: ["chat", roomId],
    queryFn: () => chatService.history(roomId, 0, 50)
  });
  const sessionQ = useQuery({
    queryKey: ["session", roomId],
    queryFn: () => sessionService.active(roomId)
  });
  const [messages, setMessages] = reactExports.useState([]);
  const [session, setSession] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (historyQ.data) {
      const sorted = [...historyQ.data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setMessages(sorted);
    }
  }, [historyQ.data]);
  reactExports.useEffect(() => {
    setSession(sessionQ.data ?? null);
  }, [sessionQ.data]);
  useRoomWebSocket(roomId, {
    onChat: (msg) => setMessages((prev) => [...prev, msg]),
    onSession: (s) => setSession(s ?? null),
    onTasks: () => qc.invalidateQueries({
      queryKey: ["tasks", roomId]
    }),
    onNotes: () => qc.invalidateQueries({
      queryKey: ["notes", roomId]
    })
  });
  const room = roomQ.data?.data || roomQ.data;
  const isLoading = roomQ.isLoading || historyQ.isLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen flex items-center justify-center bg-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-indigo-500" }) });
  }
  if (roomQ.isError || !room) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-screen flex items-center justify-center bg-slate-900 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4", children: "Failed to load room." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
        to: "/rooms"
      }), children: "Back to rooms" })
    ] }) });
  }
  const code = room.code || room.roomCode || "";
  const members = room.members || room.participants || [];
  const ownerId = room.owner?.id;
  console.log("ROOM DATA =", room);
  console.log("MEMBERS =", room.members);
  console.log("PARTICIPANTS =", room.participants);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      zt.success("Copied!");
    } catch {
      zt.error("Copy failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-screen flex flex-col bg-slate-950 text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-slate-900 border-b border-slate-800 px-6 py-3 flex flex-wrap items-center gap-4 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => navigate({
        to: "/rooms"
      }), className: "inline-flex items-center gap-1 text-slate-300 hover:text-white text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold", children: room.name }),
      room.subject && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30", children: room.subject }),
      code && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyCode, className: "inline-flex items-center gap-1.5 text-sm bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Code:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: code }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3.5 w-3.5 text-slate-400" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-1.5 text-sm text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
        " ",
        members.length || room.memberCount || 0,
        " members"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChatPanel, { roomId, messages, setMessages, currentUserId: currentUser?.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SessionCard, { roomId, session, setSession, currentUserId: currentUser?.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MembersCard, { members, ownerId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SideTabs, { roomId })
      ] })
    ] })
  ] });
}
function ChatPanel({
  roomId,
  messages,
  setMessages,
  currentUserId
}) {
  const [text, setText] = reactExports.useState("");
  const scrollRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages]);
  const sendMutation = useMutation({
    mutationFn: async (content) => {
      if (content.trim().toLowerCase().startsWith("@ai ")) {
        const prompt = content.trim().slice(4);
        await chatService.send(roomId, content, "TEXT").catch(() => {
        });
        const res = await aiService.ask(roomId, prompt);
        return res;
      }
      return chatService.send(roomId, content, "TEXT");
    },
    onError: () => zt.error("Failed to send")
  });
  const send = () => {
    const value = text.trim();
    if (!value) return;
    setText("");
    sendMutation.mutate(value);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex-1 flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto p-4 space-y-3", children: [
      messages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-slate-500 text-sm py-8", children: "No messages yet. Say hi 👋" }),
      messages.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBubble, { msg: m, isOwn: m.sender?.id === currentUserId }, m.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border-t border-slate-800 p-4 flex items-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-slate-400 hover:text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smile, { className: "h-5 w-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-64 bg-slate-800 border-slate-700 p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5 gap-1", children: EMOJIS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setText((t) => t + e), className: "text-2xl hover:bg-slate-700 rounded-md p-1", children: e }, e)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          send();
        }
      }, placeholder: "Message... (type @ai for AI help)", rows: 1, className: "flex-1 min-h-0 resize-none bg-slate-800 border-slate-700 rounded-xl px-4 py-2 text-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: send, disabled: !text.trim() || sendMutation.isPending, className: "bg-indigo-600 hover:bg-indigo-700 rounded-xl shrink-0", size: "icon", children: sendMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
    ] })
  ] });
}
function MessageBubble({
  msg,
  isOwn
}) {
  const time = msg.createdAt ? format(new Date(msg.createdAt), "h:mm a") : "";
  if (msg.type === "SYSTEM") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-slate-500 text-xs italic", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-slate-800" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: msg.content }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-slate-800" })
    ] });
  }
  if (msg.type === "AI_RESPONSE") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-indigo-500/50 rounded-xl p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-indigo-400 font-semibold mb-2", children: "🤖 AI Assistant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert prose-sm max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: msg.content }) }),
      time && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-2", children: time })
    ] });
  }
  const isEmoji = isSingleEmoji(msg.content);
  if (isOwn) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end", children: [
      isEmoji ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: msg.content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-indigo-600 rounded-xl rounded-br-sm px-4 py-2 max-w-[70%] whitespace-pre-wrap break-words", children: msg.content }),
      time && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-1", children: time })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium shrink-0", children: initials(msg.sender?.fullName || msg.sender?.username) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start max-w-[70%]", children: [
      msg.sender?.username && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mb-0.5 ml-1", children: msg.sender.username }),
      isEmoji ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: msg.content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-700 rounded-xl rounded-bl-sm px-4 py-2 whitespace-pre-wrap break-words", children: msg.content }),
      time && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-1 ml-1", children: time })
    ] })
  ] });
}
function SessionCard({
  roomId,
  session,
  setSession,
  currentUserId
}) {
  console.log("CURRENT USER =", currentUserId);
  console.log("SESSION =", session);
  console.log("STARTED BY =", session?.startedBy);
  const [elapsed, setElapsed] = reactExports.useState(0);
  reactExports.useEffect(() => {
    console.log("SESSION START TIME =", session?.startTime);
    if (!session?.startTime) return;
    const tick = () => setElapsed(Math.floor((Date.now() - new Date(session.startTime).getTime()) / 1e3));
    tick();
    const id = setInterval(tick, 1e3);
    return () => clearInterval(id);
  }, [session?.startTime]);
  const startM = useMutation({
    mutationFn: () => sessionService.start(roomId),
    onSuccess: (s) => {
      setSession(s);
      zt.success("Session started");
    },
    onError: () => zt.error("Could not start session")
  });
  const endM = useMutation({
    mutationFn: () => sessionService.end(session.id),
    onSuccess: () => {
      setSession(null);
      zt.success("Session ended");
    },
    onError: () => zt.error("Could not end session")
  });
  const fmt = reactExports.useMemo(() => {
    const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const m = String(Math.floor(elapsed % 3600 / 60)).padStart(2, "0");
    const s = String(elapsed % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }, [elapsed]);
  const participants = session?.participants || [];
  const isStarter = session && currentUserId && Number(session.startedBy?.id) === Number(currentUserId);
  participants.some((p) => Number(p.id) === Number(currentUserId));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-white mb-3", children: "⏱️ Study Session" }),
    !session ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-400 text-sm mb-3", children: "No active session" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => startM.mutate(), disabled: startM.isPending, className: "w-full bg-green-600 hover:bg-green-700 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
        " Start Session"
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-400 text-sm font-medium", children: "Session Active" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-3xl text-center my-3 text-white", children: fmt }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 text-center mb-3", children: [
        participants.length,
        " participants"
      ] }),
      isStarter ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => endM.mutate(), disabled: endM.isPending, className: "w-full bg-red-600 hover:bg-red-700 rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Square, { className: "h-4 w-4" }),
        " End Session"
      ] }) : null
    ] })
  ] });
}
function MembersCard({
  members,
  ownerId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-800", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-white mb-3", children: [
      "👥 Members (",
      members.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2", children: [
      members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium", children: initials(m.fullName || m.username) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200 flex-1 truncate", children: m.username || m.fullName }),
        m.id === ownerId && /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-yellow-400" })
      ] }, m.id)),
      members.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-slate-500 text-sm", children: "No members loaded" })
    ] })
  ] });
}
function SideTabs({
  roomId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 flex-1 flex flex-col min-h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "ai", className: "flex-1 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "bg-slate-800 grid grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "ai", children: "🤖 AI" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notes", children: "📝 Notes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tasks", children: "✅ Tasks" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ai", className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AITab, { roomId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notes", className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotesTab, { roomId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "tasks", className: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TasksTab, { roomId }) })
  ] }) });
}
const AI_MODES = [{
  type: "EXPLAIN",
  label: "📖 Explain",
  placeholder: "What topic do you want explained?"
}, {
  type: "QUIZ",
  label: "❓ Quiz",
  placeholder: "What subject for quiz questions?"
}, {
  type: "SUMMARIZE",
  label: "📋 Summarize",
  placeholder: "Paste your notes here to summarize..."
}, {
  type: "INTERVIEW",
  label: "💼 Interview Qs",
  placeholder: "What role/topic for interview questions?"
}];
function AITab({
  roomId: _roomId
}) {
  const [question, setQuestion] = reactExports.useState("");
  const [queryType, setQueryType] = reactExports.useState("EXPLAIN");
  const [response, setResponse] = reactExports.useState("");
  const m = useMutation({
    mutationFn: () => aiService.query(question, queryType),
    onSuccess: (text) => setResponse(text),
    onError: () => zt.error("AI request failed")
  });
  const placeholder = AI_MODES.find((mm) => mm.type === queryType)?.placeholder || "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      zt.success("Copied to clipboard!");
    } catch {
      zt.error("Copy failed");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: AI_MODES.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQueryType(mode.type), className: cn("rounded-lg px-3 py-2 text-sm font-medium transition-colors", queryType === mode.type ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-200 hover:bg-slate-600"), children: mode.label }, mode.type)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: question, onChange: (e) => setQuestion(e.target.value), placeholder, rows: 3, className: "w-full bg-slate-800 border-slate-700 text-white resize-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => m.mutate(), disabled: !question.trim() || m.isPending, className: "w-full bg-indigo-600 hover:bg-indigo-700", children: m.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Ask AI ✨" }),
    m.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-900 border border-indigo-500/30 rounded-xl p-4 animate-pulse text-indigo-300", children: "🤖 Thinking..." }),
    !m.isPending && response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-indigo-500/30 rounded-xl p-4 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copy, className: "absolute top-3 right-3 text-slate-400 hover:text-white", title: "Copy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-indigo-400 font-semibold mb-2", children: "🤖 AI Response" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-invert prose-sm max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { children: response }) })
    ] })
  ] });
}
function NotesTab({
  roomId
}) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["notes", roomId],
    queryFn: () => notesService.list(roomId)
  });
  const notes = q.data || [];
  const [activeId, setActiveId] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState("");
  const [saveStatus, setSaveStatus] = reactExports.useState("idle");
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [newTitle, setNewTitle] = reactExports.useState("");
  const debounceRef = reactExports.useRef(null);
  const lastSavedRef = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (!activeId && notes.length > 0) setActiveId(notes[0].id);
  }, [notes, activeId]);
  const activeNote = reactExports.useMemo(() => notes.find((n) => n.id === activeId) || null, [notes, activeId]);
  reactExports.useEffect(() => {
    if (activeNote) {
      setContent(activeNote.content || "");
      lastSavedRef.current = activeNote.content || "";
      setSaveStatus("idle");
    }
  }, [activeNote?.id]);
  const updateM = useMutation({
    mutationFn: (payload) => notesService.update(activeId, {
      content: payload.content
    }),
    onSuccess: () => {
      setSaveStatus("saved");
      qc.invalidateQueries({
        queryKey: ["notes", roomId]
      });
    },
    onError: () => {
      setSaveStatus("idle");
      zt.error("Save failed");
    }
  });
  reactExports.useEffect(() => {
    if (!activeId) return;
    if (content === lastSavedRef.current) return;
    setSaveStatus("saving");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      lastSavedRef.current = content;
      updateM.mutate({
        content
      });
    }, 1500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [content, activeId]);
  const createM = useMutation({
    mutationFn: (title) => notesService.create(roomId, title),
    onSuccess: (note) => {
      qc.invalidateQueries({
        queryKey: ["notes", roomId]
      });
      setActiveId(note.id);
      setNewTitle("");
      setDialogOpen(false);
      zt.success("Note created");
    },
    onError: () => zt.error("Could not create note")
  });
  const exportPdf = async () => {
    if (!activeId) return;
    try {
      const blob = await notesService.exportPdf(activeId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeNote?.title || "note"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      zt.error("Export failed");
    }
  };
  if (q.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 bg-slate-800 rounded animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 bg-slate-800 rounded animate-pulse" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 flex flex-col gap-3 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: activeId ?? "", onValueChange: (v) => setActiveId(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-slate-800 border-slate-700 text-white flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: notes.length === 0 ? "No notes yet" : "Select a note" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-slate-800 border-slate-700 text-white", children: notes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: n.id, children: n.title || "Untitled" }, n.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "bg-indigo-600 hover:bg-indigo-700 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-slate-900 border-slate-700 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New Note" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newTitle, onChange: (e) => setNewTitle(e.target.value), placeholder: "Note title", className: "bg-slate-800 border-slate-700 text-white" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => newTitle.trim() && createM.mutate(newTitle.trim()), disabled: !newTitle.trim() || createM.isPending, className: "bg-indigo-600 hover:bg-indigo-700", children: createM.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Create" }) })
        ] })
      ] })
    ] }),
    activeNote ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-white font-bold truncate", children: activeNote.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400", children: saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved ✓" : "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: exportPdf, className: "text-slate-300 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: content, onChange: (e) => setContent(e.target.value), placeholder: "Start writing...", className: "w-full flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-200 resize-none min-h-[200px]" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-slate-500 text-sm text-center py-8", children: "No notes yet. Create your first note ✨" })
  ] });
}
const PRIORITY_STYLES = {
  HIGH: "bg-red-500/20 text-red-300 border-red-500/40",
  MEDIUM: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  LOW: "bg-green-500/20 text-green-300 border-green-500/40"
};
function TasksTab({
  roomId
}) {
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["tasks", roomId],
    queryFn: () => tasksService.list(roomId)
  });
  const [showForm, setShowForm] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [priority, setPriority] = reactExports.useState("MEDIUM");
  const [dueDate, setDueDate] = reactExports.useState(void 0);
  const invalidate = () => qc.invalidateQueries({
    queryKey: ["tasks", roomId]
  });
  const addM = useMutation({
    mutationFn: () => tasksService.create(roomId, {
      title: title.trim(),
      priority,
      dueDate: dueDate ? dueDate.toISOString() : null
    }),
    onSuccess: () => {
      setTitle("");
      setPriority("MEDIUM");
      setDueDate(void 0);
      setShowForm(false);
      invalidate();
    },
    onError: () => zt.error("Add failed")
  });
  const completeM = useMutation({
    mutationFn: (id) => tasksService.complete(id),
    onSuccess: invalidate
  });
  const delM = useMutation({
    mutationFn: (id) => tasksService.remove(id),
    onSuccess: invalidate
  });
  const tasks = q.data || [];
  const sorted = reactExports.useMemo(() => {
    const pending = tasks.filter((t) => !t.completed);
    const done = tasks.filter((t) => t.completed);
    return [...pending, ...done];
  }, [tasks]);
  if (q.isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 space-y-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 bg-slate-800 rounded animate-pulse" }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-3", children: [
    !showForm ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setShowForm(true), className: "w-full bg-indigo-600 hover:bg-indigo-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " Add Task"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 border border-slate-700 rounded-xl p-3 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Task title", className: "bg-slate-900 border-slate-700 text-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: priority, onValueChange: (v) => setPriority(v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-slate-900 border-slate-700 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-slate-800 border-slate-700 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "HIGH", children: "High" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "MEDIUM", children: "Medium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "LOW", children: "Low" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "bg-slate-900 border-slate-700 text-white hover:bg-slate-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar$1, { className: "h-4 w-4" }),
            dueDate ? format(dueDate, "MMM d") : "Date"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverContent, { className: "w-auto p-0 bg-slate-800 border-slate-700", align: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { mode: "single", selected: dueDate, onSelect: setDueDate, initialFocus: true, className: cn("p-3 pointer-events-auto") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => addM.mutate(), disabled: !title.trim() || addM.isPending, className: "flex-1 bg-indigo-600 hover:bg-indigo-700", children: addM.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Add" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => {
          setShowForm(false);
          setTitle("");
          setDueDate(void 0);
        }, className: "text-slate-300 hover:text-white", children: "Cancel" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5", children: [
      sorted.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: cn("group flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2", t.completed && "opacity-50"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: t.completed, onChange: () => !t.completed && completeM.mutate(t.id), disabled: t.completed, className: "accent-indigo-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("text-sm text-slate-200 truncate", t.completed && "line-through"), children: t.title }),
          t.dueDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-400", children: [
            "Due ",
            format(new Date(t.dueDate), "MMM d")
          ] })
        ] }),
        t.priority && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border", PRIORITY_STYLES[t.priority]), children: t.priority }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => delM.mutate(t.id), className: "text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity", title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
      ] }, t.id)),
      sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-slate-500 text-sm text-center py-6", children: "No tasks yet. Add your first one ✨" })
    ] })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(ProtectedRoute, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoomPage, {}) });
export {
  SplitComponent as component
};

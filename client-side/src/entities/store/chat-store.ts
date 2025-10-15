import { makeAutoObservable } from "mobx";
import type { IMessage, IUser } from "../types/type";
import { chatApi } from "@/entities/endpoints/chat-api";
import { Socket, io } from "socket.io-client";

const URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

class ChatStore {
  users: IUser[] = [];
  messages: IMessage[] = [];
  selectedUser: IUser | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  // Состояние сокета
  socket: Socket | null = null;
  isConnected: boolean = false;
  onlineUsers: Set<string> = new Set();
  userActivities: Map<string, string> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  setUsers = (users: IUser[]): void => {
    this.users = users;
  };
  setLoading = (loading: boolean): void => {
    this.isLoading = loading;
  };
  setError = (error: string | null): void => {
    this.error = error;
  };
  setSelectedUser = (selectedUser: IUser | null): void => {
    this.selectedUser = selectedUser;
  };
  setMessage = (messages: IMessage[]): void => {
    this.messages = messages;
  };
  setConnected = (connected: boolean): void => {
    this.isConnected = connected;
  };
  setOnlineUsers = (onlineUsers: Set<string>): void => {
    this.onlineUsers = onlineUsers;
  };
  setUserActivities = (userActivities: Map<string, string>): void => {
    this.userActivities = userActivities;
  };
  addOnlineUser = (userId: string): void => {
    this.onlineUsers.add(userId);
  };
  removeOnlineUser = (userId: string): void => {
    this.onlineUsers.delete(userId);
  };
  addMessage = (message: IMessage): void => {
    this.messages.push(message);
  };
  setUserActivity = (userId: string, activity: string): void => {
    this.userActivities.set(userId, activity);
  };

  fetchUsers = async (): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const users = await chatApi.getUsers();
      this.setUsers(users);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  fetchMessage = async (useId: string): Promise<void> => {
    this.setLoading(true);
    this.setError(null);

    try {
      const message = await chatApi.getMessages(useId);
      this.setMessage(message);
    } catch (error: any) {
      this.setError(error.response?.data?.message || error.message);
    } finally {
      this.setLoading(false);
    }
  };

  isUserOnline = (userId: string): boolean => {
    return this.onlineUsers.has(userId);
  };
  getUserActivity = (userId: string): string => {
    return this.userActivities.get(userId) || "Idle";
  };

  // Сокеты
  initSocket = (userId: string): void => {
    if (this.isConnected && this.socket) return;

    try {
      this.socket = io(URL, {
        autoConnect: false,
        withCredentials: true,
        auth: { userId },
      });

      this.socket.connect();

      this.socket.on("connect", () => {
        this.setConnected(true);
        this.socket?.emit("user_connected", userId);
      });

      this.socket.on("disconnect", () => {
        this.setConnected(false);
      });

      this.socket.on("connect_error", () => {
        this.setConnected(false);
      });

      this.socket.on("users_online", (users: string[]) => {
        this.setOnlineUsers(new Set(users));
      });

      this.socket.on("activities", (activities: [string, string][]) => {
        this.setUserActivities(new Map(activities));
      });

      this.socket.on("user_connected", (userId: string) => {
        this.addOnlineUser(userId);
      });

      this.socket.on("user_disconnected", (userId: string) => {
        this.removeOnlineUser(userId);
      });

      this.socket.on("receive_message", (message: IMessage) => {
        this.addMessage(message);
      });

      this.socket.on("message_sent", (message: IMessage) => {
        this.addMessage(message);
      });

      this.socket.on(
        "activity_updated",
        (data: { userId: string; activity: string }) => {
          this.setUserActivity(data.userId, data.activity);
        },
      );
    } catch (error) {
      console.error("Error initializing socket:", error);
      this.setConnected(false);
    }
  };

  updateActivity = (userId: string, activity: string): void => {
    if (this.socket && this.isConnected) {
      this.socket.emit("update_activity", { userId, activity });
    }
  };

  sendMessage = (data: {
    senderId: string;
    receiverId: string;
    content: string;
  }): void => {
    if (this.socket && this.isConnected) {
      this.socket.emit("send_message", data);
    }
  };

  disconnectSocket = (): void => {
    if (this.socket) {
      this.socket.disconnect();
      this.setConnected(false);
      this.socket = null;
      this.setOnlineUsers(new Set());
      this.setUserActivities(new Map());
    }
  };

  cleanup = (): void => {
    this.disconnectSocket();
    this.setUsers([]);
    this.setMessage([]);
    this.setSelectedUser(null);
  };
}

export const chatStore = new ChatStore();

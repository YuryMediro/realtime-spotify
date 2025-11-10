import type { IMessage, IUser } from "@/entities/types/type";
import { axiosInstance } from "../axios";
import { API_URL } from "../config/api.config";

class ChatService {
  async getUser() {
    const { data } = await axiosInstance<IUser[]>({
      url: API_URL.user(),
      method: "GET",
    });
    return data;
  }
  async getMessages(userId: string) {
    const { data } = await axiosInstance<IMessage[]>({
      url: API_URL.usersMessages(`/${userId}`),
      method: "GET",
    });
    return data;
  }
}

export const chatService = new ChatService();

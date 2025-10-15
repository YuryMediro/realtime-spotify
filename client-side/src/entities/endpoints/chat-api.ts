import type { IMessage, IUser } from "@/entities/types/type";
import { axiosInstance } from "../../shared/api/axios";

export const chatApi = {
  getUsers: (): Promise<IUser[]> =>
    axiosInstance.get<IUser[]>("/users").then((res) => res.data),

  getMessages: (userId: string): Promise<IMessage[]> =>
    axiosInstance
      .get<IMessage[]>(`/users/messages/${userId}`)
      .then((res) => res.data),
};

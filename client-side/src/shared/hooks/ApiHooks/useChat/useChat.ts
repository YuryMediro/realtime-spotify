import { chatService } from "@/shared/api/service/chat.service";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["get users"],
    queryFn: () => chatService.getUser(),
  });
  return { users, isLoading };
};

export const useGetMessages = (userId: string) => {
  const { data: messages, isLoading } = useQuery({
    queryKey: ["get messages", userId],
    queryFn: () => chatService.getMessages(userId!),
    enabled: !!userId,
  });
  return { messages, isLoading };
};
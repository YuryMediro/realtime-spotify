import { chatStore } from "@/entities/store/chat-store";
import { useUser } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

export const Chat = observer(() => {
  const { user } = useUser();
  const { fetchUsers } = chatStore;
  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);
  return <div>Chat</div>;
});

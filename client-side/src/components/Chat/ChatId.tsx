import { observer } from "mobx-react-lite";
import { Messages } from "./ui/Messages";
import { UserList } from "./ui/UserList";
import { useParams } from "react-router-dom";
import { chatStore } from "@/entities/store/chat-store";
import { useEffect } from "react";

export const ChatId = observer(() => {
  const { clerkId } = useParams<{ clerkId: string }>();
  const { users, setSelectedUser} = chatStore;

  useEffect(() => {
    if (clerkId && users.length > 0) {
      const user = users.find((user) => user.clerkId === clerkId);
      if (user) {
        setSelectedUser(user);
      }
    }
  }, [clerkId, users, setSelectedUser]);

  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <div className=" h-[calc(100vh-180px)] flex">
        <UserList />
        <Messages />
      </div>
    </div>
  );
});

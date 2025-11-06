import { observer } from "mobx-react-lite";
import { Messages } from "./ui/Messages";
import { UserList } from "./ui/UserList";
import { useParams } from "react-router-dom";
import { chatStore } from "@/entities/store/chat-store";
import { useEffect } from "react";
import { ScrollArea } from "../kit/scroll-area";
import { MessageInput } from "./ui/MessageInput";

export const ChatId = observer(() => {
  const { clerkId } = useParams<{ clerkId: string }>();
  const { users, setSelectedUser } = chatStore;

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
      <div className="flex h-[calc(100vh-155px)]">
        <UserList />
        <div className='w-full'>
          <ScrollArea className="h-[calc(100vh-130px)] lg:h-[calc(100vh-210px)] w-full">
            <Messages />
          </ScrollArea>
          <MessageInput />
        </div>
      </div>
    </div>
  );
});

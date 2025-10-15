import { chatStore } from "@/entities/store/chat-store";
import { TopBar } from "@/widgets/TopBar/TopBar";
import { useUser } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import { UserList } from "./ui/UserList";
import { NoSelectedUser } from "./ui/NoSelectedUser";
import { ScrollArea } from "../kit/scroll-area";
import { ChatHeader } from "./ui/ChatHeader";

export const Chat = observer(() => {
  const { user } = useUser();
  const { fetchUsers, fetchMessage, selectedUser, messages } = chatStore;

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    if (selectedUser) fetchMessage(selectedUser.clerkId);
  }, [selectedUser, fetchMessage]);

  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <TopBar />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea>
                {messages.map((message) => (
                  <div key={message._id}>
                    <p>dfgfgdfgf</p>
                  </div>
                ))}
              </ScrollArea>
            </>
          ) : (
            <NoSelectedUser />
          )}
        </div>
      </div>
    </div>
  );
});

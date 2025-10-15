import { chatStore } from "@/entities/store/chat-store";
import { TopBar } from "@/widgets/TopBar/TopBar";
import { useUser } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

import { UserList } from "./ui/UserList";
import { NoSelectedUser } from "./ui/NoSelectedUser";
import { ScrollArea } from "../kit/scroll-area";
import { ChatHeader } from "./ui/ChatHeader";
import { Avatar, AvatarImage } from "../kit/avatar";
import { MessageInput } from "./ui/MessageInput";
import { formatTimeChat } from "@/shared/lib/format/formatTimeChat";

export const Chat = observer(() => {
  const { user } = useUser();
  const { fetchUsers, fetchMessage, selectedUser, messages } = chatStore;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    if (selectedUser) fetchMessage(selectedUser.clerkId);
  }, [selectedUser, fetchMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <TopBar />

      <div className="grid lg:grid-cols-[250px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UserList />

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />
              <ScrollArea className="h-[calc(100vh-340px)]">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message._id}
                      className={`flex items-end gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="size-8 flex-shrink-0">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                          alt={message._id}
                        />
                      </Avatar>
                      <div
                        className={`rounded-lg p-3 max-w-xs break-words
													${message.senderId === user?.id ? "bg-green-800" : "bg-zinc-700"}
												`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        <span className="text-xs text-zinc-300 mt-1 block text-end">
                          {formatTimeChat(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoSelectedUser />
          )}
        </div>
      </div>
    </div>
  );
});

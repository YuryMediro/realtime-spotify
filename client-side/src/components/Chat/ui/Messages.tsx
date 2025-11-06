import { chatStore } from "@/entities/store/chat-store";
import { formatTimeChat } from "@/shared/lib/format/formatTimeChat";
import { useUser } from "@clerk/clerk-react";
import { observer } from "mobx-react-lite";
import { useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageInput } from "./MessageInput";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Avatar, AvatarImage } from "@/components/kit/avatar";
import { Button } from "@/components/kit/button";
import { ArrowDown } from "lucide-react";

export const Messages = observer(() => {
  const { user } = useUser();
  const { fetchUsers, fetchMessage, selectedUser, messages } = chatStore;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    if (selectedUser) fetchMessage(selectedUser.clerkId);
  }, [selectedUser, fetchMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className="flex flex-col h-full w-full flex-1 min-w-0">
      <ChatHeader />
      <ScrollArea className="overflow-y-auto flex-1">
        <div className="p-2 sm:p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex items-end gap-2 smm:gap-3 ${message.senderId === user?.id ? "flex-row-reverse" : ""}`}
            >
              <Avatar className="size-8 flex-shrink-0 sm:block hidden">
                <AvatarImage
                  src={
                    message.senderId === user?.id
                      ? user.imageUrl
                      : selectedUser?.imageUrl
                  }
                  alt={message._id}
                />
              </Avatar>
              <div
                className={`rounded-lg p-2 sm:p-3 max-w-[85vw] sm:max-w-xs lg:max-w-md break-words ${message.senderId === user?.id ? "bg-green-800" : "bg-zinc-700"}`}
              >
                <p className="text-sm whitespace-pre-wrap break-words overflow-hidden">
                  {message.content}
                </p>
                <span className="text-xs text-zinc-300 mt-1 block text-end">
                  {formatTimeChat(message.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          size="icon"
          className="absolute bottom-4 right-4 size-10 rounded-full p-2 shadow-lg bg-zinc-700/90 hover:bg-zinc-600/90 z-10"
          onClick={scrollToBottom}
        >
          <ArrowDown className="text-white" />
        </Button>
        <div ref={messagesEndRef} />
      </ScrollArea>
      <MessageInput />
    </div>
  );
});

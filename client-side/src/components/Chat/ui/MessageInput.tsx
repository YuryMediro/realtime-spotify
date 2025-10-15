import { Button } from "@/components/kit/button";
import { Input } from "@/components/kit/input";
import { chatStore } from "@/entities/store/chat-store";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";

export const MessageInput = observer(() => {
  const { sendMessage, selectedUser } = chatStore;
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();

  const handleSendMessage = () => {
    if (!selectedUser || !user || !newMessage.trim()) return;

    sendMessage({
      senderId: user.id,
      receiverId: selectedUser.clerkId,
      content: newMessage.trim(),
    });
    setNewMessage("");
  };
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          className="bg-zinc-800 border-none"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button
          size={"icon"}
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
});

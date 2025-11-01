import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { Button } from "@/components/kit/button";
import { chatStore } from "@/entities/store/chat-store";
import { ArrowLeft } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const ChatHeader = observer(() => {
  const { selectedUser, isUserOnline } = chatStore;

  if (!selectedUser) return null;

  const isOnline = isUserOnline(selectedUser.clerkId);

  return (
    <div className="py-1 md:py-2.5 px-2 border-b border-zinc-800 bg-zinc-600 rounded-lg">
      <div className="flex items-center gap-3">
        <Link to={"/chat"}>
          <Button variant="ghost">
            <ArrowLeft />
          </Button>
        </Link>
        <Avatar className="size-10 border border-zinc-800">
          <AvatarImage
            src={selectedUser.imageUrl}
            alt={selectedUser.fullName}
          />
          <AvatarFallback className="bg-zinc-800 text-zinc-300">
            {selectedUser.fullName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p className="text-sm text-zinc-300">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
});

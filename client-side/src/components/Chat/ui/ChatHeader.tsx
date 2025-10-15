import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { chatStore } from "@/entities/store/chat-store";
import { observer } from "mobx-react-lite";

export const ChatHeader = observer(() => {
  const { selectedUser, isUserOnline } = chatStore;

  if (!selectedUser) return null;

  const isOnline = isUserOnline(selectedUser.clerkId);

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
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
          <p className="text-sm text-zinc-400">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
});

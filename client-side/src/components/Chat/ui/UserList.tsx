import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { ScrollArea } from "@/components/kit/scroll-area";
import { chatStore } from "@/entities/store/chat-store";
import { observer } from "mobx-react-lite";

export const UserList = observer(() => {
  const { users, isUserOnline, selectedUser, setSelectedUser } = chatStore;
  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2">
            {users.map((user) => {
              const isOnline = isUserOnline(user.clerkId);
              return (
                <div
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-700" : "hover:bg-zinc-800/50"}`}
                >
                  <div className="relative">
                    <Avatar className="size-10 border border-zinc-800">
                      <AvatarImage src={user.imageUrl} alt={user.fullName} />
                      <AvatarFallback className="bg-zinc-800 text-zinc-300">
                        {user.fullName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-zinc-900
                        ${isOnline ? "bg-green-500" : "bg-zinc-500"}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0 lg:block hidden">
                    <span className="font-medium truncate">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});

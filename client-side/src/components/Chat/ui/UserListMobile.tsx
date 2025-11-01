import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { chatStore } from "@/entities/store/chat-store";
import { formatTimeChat } from "@/shared/lib/format/formatTimeChat";
import { UserListMobileSkeleton } from "@/shared/ui/skeleton/UserListMobileSkeleton";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const UserListMobile = observer(() => {
  const {
    users,
    isUserOnline,
    selectedUser,
    isLoading,
    setSelectedUser,
    getLastMessageForUser,
  } = chatStore;
  return (
    <div className="flex flex-col  w-full">
      {/* <ScrollArea className="h-[calc(100vh-130px)] "> */}
        <div className="space-y-2">
          {isLoading ? (
            <UserListMobileSkeleton />
          ) : (
            users.map((user) => {
              const isOnline = isUserOnline(user.clerkId);
              const lastMessage = getLastMessageForUser(user.clerkId);
              return (
                  <Link
                    to={`/chat/${user.clerkId}`}
                    key={user._id}
                    className="flex flex-col gap-2"
                  >
                    <div
                      onClick={() => setSelectedUser(user)}
                      className={`w-full border bg-zinc-800 flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-600" : "hover:bg-zinc-700"}`}
                    >
                      <div className="relative">
                        <Avatar className="size-10 border border-zinc-800">
                          <AvatarImage
                            src={user.imageUrl}
                            alt={user.fullName}
                          />
                          <AvatarFallback className="bg-zinc-800 text-zinc-300">
                            {user.fullName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-zinc-900
                        ${isOnline ? "bg-green-500" : "bg-zinc-500"}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0 w-0">
                        <div className="flex items-center justify-between w-full gap-2">
                          <span className="text-sm font-medium block truncate">
                            {user.fullName}
                          </span>
                          {lastMessage && (
                            <span className="text-xs text-zinc-400 whitespace-nowrap flex-shrink-0">
                              {formatTimeChat(lastMessage.createdAt)}
                            </span>
                          )}
                        </div>
                        <div className="w-full mt-1">
                          <span className="text-xs text-zinc-400 block truncate w-full ">
                            {lastMessage ? lastMessage.content : "No messages"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
              );
            })
          )}
        </div>
      {/* </ScrollArea> */}
    </div>
  );
});

import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { ScrollArea } from "@/components/kit/scroll-area";
import { chatStore } from "@/entities/store/chat-store";
import { UserListSkeleton } from "@/shared/ui/skeleton/UserListSkeleton";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const UserList = observer(() => {
  const { users, isUserOnline, selectedUser, isLoading, setSelectedUser } =
    chatStore;

  return (
    <div className="border-r border-zinc-800 sm:flex hidden">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-180px)] ">
          <div className="space-y-2">
            {isLoading ? (
              <UserListSkeleton />
            ) : (
              users.map((user) => {
                const isOnline = isUserOnline(user.clerkId);
                return (
                  <>
                    <Link to={`/chat/${user.clerkId}`} className="flex gap-2">
                      <div
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`flex items-center max-w-[280px] justify-center lg:justify-start gap-3 p-3
										rounded-lg cursor-pointer transition-colors ${selectedUser?.clerkId === user.clerkId ? "bg-zinc-600" : "hover:bg-zinc-700"}`}
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

                        <div className="flex-1 min-w-0 lg:block hidden  truncate">
                          <span className="font-medium truncate">
                            {/* {user.fullName} */}
                            Alienaaasdasdasdasdasdasdasdasasdasd
                          </span>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
});

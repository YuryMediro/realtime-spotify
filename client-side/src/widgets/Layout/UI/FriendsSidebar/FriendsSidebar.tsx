import { Avatar, AvatarFallback, AvatarImage } from "@/components/kit/avatar";
import { ScrollArea } from "@/components/kit/scroll-area";
import { chatStore } from "@/entities/store/chat-store";
import { useUser } from "@clerk/clerk-react";
import { Music, User } from "lucide-react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { LoginMessage } from "./LoginMessage";
import { Sidebar } from "@/components/kit/sidebar";
import { Link } from "react-router-dom";

export const FriendsSidebar = observer(() => {
  const { users, fetchUsers, isUserOnline, getUserActivity, setSelectedUser } =
    chatStore;
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers]);

  const otherUsers = users.filter((userItem) => userItem.clerkId !== user?.id);

  return !user ? (
    <Sidebar collapsible="none" className="h-svh hidden xl:flex bg-zinc-900">
      <div className=" bg-zinc-900 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <User className="size-5 shrink-0" />
            <h2 className="font-semibold">What they're listening to</h2>
          </div>
        </div>
      </div>
      <LoginMessage />
    </Sidebar>
  ) : (
    <Sidebar collapsible="none" className="h-svh hidden xl:flex bg-zinc-900">
      <div className=" bg-zinc-900 flex flex-col">
        <div className="p-4 flex justify-between items-center border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <User className="size-5 shrink-0" />
            <h2 className="font-semibold">What they're listening to</h2>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-70px)]">
          {otherUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-ful text-center p-4">
              <User className="size-8 text-zinc-600 mb-2" />
              <p className="text-zinc-400 text-sm">No friends yet</p>
              <p className="text-zinc-500 text-xs mt-1">
                Connect with others to see what they're listening to
              </p>
            </div>
          ) : (
            otherUsers.map((user) => {
              const isOnline = isUserOnline(user.clerkId);
              const activity = getUserActivity(user.clerkId);
              const isPlaying = activity && activity !== "Idle";
              return (
                <Link
                  to={`/chat/${user.clerkId}`}
                  key={user._id}
                  className="hover:bg-zinc-800/50 p-3 rounded-md transition-colors flex flex-col gap-4"
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="size-10 border border-zinc-800">
                        <AvatarImage src={user.imageUrl} alt={user.fullName} />
                        <AvatarFallback className="bg-zinc-800 text-zinc-300">
                          {user.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-zinc-900 
                        ${isOnline ? "bg-green-500" : "bg-zinc-500"}
                      `}
                        title={isOnline ? "Online" : "Offline"}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm text-white truncate">
                          {user.fullName}
                        </span>
                        {isPlaying && (
                          <Music className="size-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>

                      {isPlaying ? (
                        <div className="mt-1">
                          <div className="mt-1 text-sm text-white font-medium truncate">
                            {activity.replace("Playing", " ").split(" by ")[0]}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">
                            {activity.split(" by ")[1]}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-zinc-400">
                          {isOnline ? "Online" : "Offline"}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </ScrollArea>
      </div>
    </Sidebar>
  );
});

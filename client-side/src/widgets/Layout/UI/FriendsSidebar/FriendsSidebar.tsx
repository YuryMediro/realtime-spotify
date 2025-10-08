import { ScrollArea } from "@/components/kit/scroll-area";
import { chatStore } from "@/entities/store/chat-store";
import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { useEffect } from "react";

export const FriendsSidebar = () => {
    const {users,fetchUsers} = chatStore
    const {user} = useUser()
    useEffect(() => {
      if (user) fetchUsers()
    }, [fetchUsers, user]);

  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col'>
        <div  className='p-4 flex justify-between items-center border-b border-zinc-800'>
            <div className='flex items-center gap-2'>
                <User className='size-5 shrink-0'/>
                <h2 className='font-semibold'>What they're listening to</h2>
            </div>
        </div>

        <ScrollArea>
            <div>
                {users.map((user) => (
                    <div key={user._id}>
                        {user.fullName}
                    </div>
                ))}
            </div>

        </ScrollArea>
    </div>
  );
};
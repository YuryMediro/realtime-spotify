import { UserList } from "./ui/UserList";
import { NoSelectedUser } from "./ui/NoSelectedUser";
import { useParams } from "react-router-dom";
import { ChatId } from "./ui/ChatId";

export const Chat = () => {
  const { userId } = useParams();
  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <div className="flex h-[calc(100vh-180px)]">
        <UserList />
        {userId ? <ChatId /> : <NoSelectedUser />}
      </div>
    </div>
  );
};

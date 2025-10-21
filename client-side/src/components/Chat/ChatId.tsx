import { Messages } from "./ui/Messages";
import { UserList } from "./ui/UserList";

export const ChatId = () => {
  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <div className=" h-[calc(100vh-180px)] flex">
        <UserList />
        <Messages />
      </div>
    </div>
  );
};

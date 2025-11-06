import { UserList } from "./ui/UserList";
import { NoSelectedUser } from "./ui/NoSelectedUser";
import { UserListMobile } from "./ui/UserListMobile";

export const Chat = () => {
  return (
    <div className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      <div className="h-[calc(100vh-155px)] lg:flex hidden">
        <UserList />
        <NoSelectedUser />
      </div>
      <div className="lg:hidden flex">
        <UserListMobile />
      </div>
    </div>
  );
};

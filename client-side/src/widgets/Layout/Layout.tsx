import { Outlet } from "react-router-dom";
import { AudioFooter } from "./UI/AudioFooter/AudioFooter";
import { AudioPlayer } from "@/features/AudioPlayer/AudioPlayer";
import {
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
} from "@/components/kit/sidebar";
import { LeftSidebar } from "@/widgets/Layout/UI/LeftSidebar/LeftSidebar";
import { MainHeader } from "./UI/MainHeader/MainHeader";
import { FriendsSidebar } from "./UI/FriendsSidebar/FriendsSidebar";

export const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <LeftSidebar />
        <SidebarInset>
          <AudioPlayer />
          <MainHeader />
          <div className="flex flex-1 flex-col gap-4 mx-2 lg:mx-4 mb-2 lg:mb-3">
            <Outlet />
          </div>
          <SidebarFooter className="p-0 sticky bottom-0">
            <AudioFooter />
          </SidebarFooter>
        </SidebarInset>
        <FriendsSidebar />
      </SidebarProvider>
    </>
  );
};

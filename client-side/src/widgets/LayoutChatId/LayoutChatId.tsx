import { Outlet } from "react-router-dom";
import {
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
} from "@/components/kit/sidebar";
import { LeftSidebar } from "@/widgets/Layout/UI/LeftSidebar/LeftSidebar";
import { HeaderChatId } from "./UI/HeaderChatId";
import { FooterChatId } from "./UI/FooterChatId";
import { AudioPlayer } from "@/features/AudioPlayer/AudioPlayer";
import { FriendsSidebar } from "../Layout/UI/FriendsSidebar/FriendsSidebar";

export const LayoutChatId = () => {
  return (
    <>
      <SidebarProvider>
        <LeftSidebar />
        <SidebarInset>
          <AudioPlayer/>
          <HeaderChatId/>
          <div className="flex flex-1 flex-col gap-4 mx-0 lg:mx-4 mb-2 lg:mb-3">
            <Outlet />
          </div>
          <SidebarFooter className="p-0 sticky bottom-0 bg-background/70 backdrop-blur-md">
            <FooterChatId/>
          </SidebarFooter>
        </SidebarInset>
        <FriendsSidebar/>
      </SidebarProvider>
    </>
  );
};

import { Outlet } from "react-router-dom";
import { AudioFooter } from "./UI/AudioFooter/AudioFooter";
import { AudioPlayer } from "@/features/AudioPlayer/AudioPlayer";
import { SidebarInset, SidebarProvider } from "@/components/kit/sidebar";

import { LeftSidebar } from "@/widgets/Layout/UI/LeftSidebar/LeftSidebar";
import { MainHeader } from "./UI/MainHeader/MainHeader";

export const Layout = () => {
  return (
    <SidebarProvider>
      <LeftSidebar />
      <SidebarInset>
        <AudioPlayer />
        <MainHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
        <AudioFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};

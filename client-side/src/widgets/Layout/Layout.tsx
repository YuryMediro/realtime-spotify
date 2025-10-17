import { Outlet } from "react-router-dom";
import { AudioFooter } from "./UI/AudioFooter/AudioFooter";
import { AudioPlayer } from "@/features/AudioPlayer/AudioPlayer";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/kit/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/kit/breadcrumb";
import { Separator } from "@/components/kit/separator";
import { LeftSidebar } from "@/widgets/Layout/UI/LeftSidebar/LeftSidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <LeftSidebar />
      <SidebarInset>
        <AudioPlayer />
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
        <AudioFooter />
      </SidebarInset>
    </SidebarProvider>
  );
};

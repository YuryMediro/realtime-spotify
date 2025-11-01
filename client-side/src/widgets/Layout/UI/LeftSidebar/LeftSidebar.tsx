"use client";

import * as React from "react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";

import { NavUser } from "@/widgets/Layout/UI/LeftSidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/kit/sidebar";
import { Nav } from "./Nav";
import { NavPlaylist } from "./NavPlaylist";

// This is sample data.
const data = {
  nav: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Message",
      url: "/chat",
      icon: MessageCircle,
    },
  ],
  navMain: [
    {
      title: "Playlist",
      url: "#",
      icon: Library,
    },
  ],
};

export function LeftSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-none">
      <SidebarHeader className="bg-background p-0 pb-3">
        <Nav nav={data.nav} />
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 rounded-lg">
        <NavPlaylist items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-background p-0 pt-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

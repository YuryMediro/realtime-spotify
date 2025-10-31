"use client";

import * as React from "react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";

import { NavUser } from "@/widgets/Layout/UI/LeftSidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
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
      <SidebarContent className="flex flex-col gap-3 bg-background">
        <Nav nav={data.nav} />
        <NavPlaylist items={data.navMain} />
        <NavUser />
      </SidebarContent>
    </Sidebar>
  );
}

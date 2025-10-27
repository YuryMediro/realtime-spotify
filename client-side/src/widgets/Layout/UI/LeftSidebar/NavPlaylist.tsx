import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/kit/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/kit/sidebar";
import { observer } from "mobx-react-lite";
import { musicStore } from "@/entities/store/music-store";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export const NavPlaylist = observer(
  ({
    items,
  }: {
    items: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  }) => {
    const { albums, fetchAlbums } = musicStore;
    const location = useLocation();
    useEffect(() => {
      fetchAlbums();
    }, []);
    return (
      <SidebarGroup className="rounded-lg bg-zinc-900 py-4 h-full ">
        <SidebarMenu>
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild className="cursor-pointer">
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className={"flex flex-col gap-3 mt-1"}>
                  {albums.map((album) => {
                    const isActive =
                      location.pathname === `/albums/${album._id}`;
                    return (
                      <SidebarMenuSubItem key={album._id}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            to={`/albums/${album._id}`}
                            className={`p-6.5 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer ${
                              isActive ? "bg-white/10" : ""
                            } `}
                          >
                            <img
                              src={album.imageUrl}
                              alt={"album img"}
                              className="size-12 rounded-md flex-shrink-0 object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {album.title}
                              </p>
                              <p className="text-sm text-zinc-400 truncate">
                                Album • {album.artist}
                              </p>
                            </div>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    );
  },
);

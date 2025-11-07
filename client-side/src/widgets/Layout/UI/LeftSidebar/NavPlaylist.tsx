import { type LucideIcon } from "lucide-react";
import { Collapsible } from "@/components/kit/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/kit/sidebar";
import { Link, useLocation } from "react-router-dom";
import { useGetAlbums } from "@/shared/hooks/ApiHooks/useAlbums/useAlbums";
import { PlayListSkeleton } from "@/shared/ui/skeleton/PlayListSkeleton";

export const NavPlaylist = ({
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
  const location = useLocation();
  const { albums, isLoading } = useGetAlbums();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleClose = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };
  if (isLoading) return <PlayListSkeleton />;
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={item.title} disabled={true}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
              <SidebarMenu className="flex flex-col gap-3 mt-1">
                {albums?.map((album) => {
                  const isActive = location.pathname === `/albums/${album._id}`;
                  return (
                    <SidebarMenuSubItem key={album._id}>
                      <SidebarMenuSubButton asChild>
                        <Link
                          to={`/albums/${album._id}`}
                          className={`p-6 pl-0 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer ${
                            isActive ? "bg-white/10" : ""
                          } `}
                          onClick={handleClose}
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
              </SidebarMenu>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

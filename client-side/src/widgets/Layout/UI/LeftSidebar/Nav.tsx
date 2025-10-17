import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { observer } from "mobx-react-lite";
import { Link, useLocation } from "react-router-dom";

export const Nav = observer(
  ({
    nav,
  }: {
    nav: {
      title: string;
      url: string;
      icon?: LucideIcon;
      isActive?: boolean;
      nav?: {
        title: string;
        url: string;
      }[];
    }[];
  }) => {
    const location = useLocation();

    return (
      <SidebarGroup className="rounded-lg bg-zinc-900 py-4 px-1">
        <SidebarMenu className={"gap-3"}>
          {nav.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem>
                <Link
                  to={item.url}
                  className={`hover:bg-zinc-800 rounded-md flex items-center${
                    isActive ? "bg-white/10" : ""
                  } `}
                >
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={"cursor-pointer"}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  },
);

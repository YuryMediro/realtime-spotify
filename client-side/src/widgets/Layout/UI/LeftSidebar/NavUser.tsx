import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NavUser = () => {
  const { user } = useUser();
 const navigate = useNavigate();

  if (!user) {
    return (
      <SidebarGroup className="rounded-t-lg bg-zinc-900 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full h-11 cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              <SignedOut>
                <LogIn />
                <span className="text-sm font-medium">Sign in</span>
              </SignedOut>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="rounded-t-lg bg-zinc-900 py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserButton />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.fullName}</span>
              <span className="truncate text-xs">
                {user.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
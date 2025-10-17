import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/kit/sidebar";
import { SingInOAuthButton } from "@/features/SingInOAuthButton/SingInOAuthButton";
import { useUser, useClerk, SignedOut } from "@clerk/clerk-react";
import { ChevronsUpDown } from "lucide-react";

export const NavUser = ({}) => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { state } = useSidebar();
  const isExpanded = state === "expanded";

  const handleOpenMenu = () => {
    openUserProfile();
  };

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            {isExpanded && (
              <SignedOut>
                <SingInOAuthButton />
              </SignedOut>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
          onClick={handleOpenMenu}
        >
          <img
            src={user.imageUrl}
            alt={user.fullName || "User"}
            className="h-8 w-8 rounded-lg"
          />
          {isExpanded && (
            <>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                <span className="truncate text-xs">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

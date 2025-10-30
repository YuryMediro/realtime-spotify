import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/kit/sidebar";
import { SignedOut, UserButton, useSignIn, useUser } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";

export const NavUser = () => {
  const { user } = useUser();
  const { signIn, isLoaded } = useSignIn();
  const handleSignIn = () => {
    if (!isLoaded) return;

    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  if (!user) {
    return (
      <SidebarGroup className="rounded-lg bg-zinc-900 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="w-full h-11 cursor-pointer"
              onClick={handleSignIn}
            >
              <SignedOut>
                <FcGoogle />
                <span className="text-sm font-medium">
                  Continue with Google
                </span>
              </SignedOut>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup className="rounded-lg bg-zinc-900 py-4">
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
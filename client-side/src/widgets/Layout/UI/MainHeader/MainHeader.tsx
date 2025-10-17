import { buttonVariants } from "@/components/kit/button";
import { Separator } from "@/components/kit/separator";
import { SidebarTrigger } from "@/components/kit/sidebar";
import { adminStore } from "@/entities/store/admin-store";
import { SingInOAuthButton } from "@/features/SingInOAuthButton/SingInOAuthButton";
import { cn } from "@/shared/lib/utils";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const MainHeader = observer(() => {
  const { isAdmin } = adminStore;

  return (
    <header className="sticky top-0 z-50 flex w-full items-center h-18 rounded-md p-4 ">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link to={"/"} className="flex items-center gap-2">
              <img src="spotify.png" alt="Spotify logo" className={"size-8"} />
              Spotify
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to={"/admin"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <LayoutDashboardIcon className="size-4  mr-2" />
                Admin Panel
              </Link>
            )}

            <SignedOut>
              <SingInOAuthButton />
            </SignedOut>

            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
});

// className="flex h-16 sticky shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">

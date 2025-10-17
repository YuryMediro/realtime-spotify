import { buttonVariants } from "@/components/kit/button";
import { adminStore } from "@/entities/store/admin-store";
import { SingInOAuthButton } from "@/features/SingInOAuthButton/SingInOAuthButton";
import { cn } from "@/shared/lib/utils";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { DotIcon, LayoutDashboardIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export const TopBar = observer(() => {
  const { isAdmin } = adminStore;

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    "
    >
      <div className={"flex items-center gap-2"}>
        <img src="spotify.png" alt="Spotify logo" className={"size-8"} />
        Spotify
      </div>
      <div className={"flex items-center gap-4"}>
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
  );
});

import { buttonVariants } from "@/components/kit/button";
import { Separator } from "@/components/kit/separator";
import { SidebarTrigger } from "@/components/kit/sidebar";
import { cn } from "@/shared/lib/utils";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FaSpotify } from "react-icons/fa6";
import { SingInButton } from "@/features/SingInButton/SingInButton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/kit/tooltip";
import { useAdmin } from "@/shared/hooks/ApiHooks/useAdmin/useAdmin";

export const MainHeader = () => {
  const { data: adminStatus } = useAdmin();
  const isAdmin = adminStatus?.admin || false;

  return (
    <header className="sticky top-0 z-50 flex w-full items-center h-13 lg:h-18 rounded-md p-2 bg-background/70 backdrop-blur-md">
      <div className="flex items-center gap-2 px-4 w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="-ml-1" />
          </TooltipTrigger>
          <TooltipContent>Toggle Sidebar</TooltipContent>
        </Tooltip>
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link to={"/"} className="flex items-center gap-2">
              <FaSpotify className="size-8 text-green-500" />
              <span className="hidden sm:block"> Spotify</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to={"/admin"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <LayoutDashboardIcon className="size-4 sm:mr-2" />
                <p className="sm:block hidden">Admin Panel</p>
              </Link>
            )}

            <SignedOut>
              <SingInButton />
            </SignedOut>

            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

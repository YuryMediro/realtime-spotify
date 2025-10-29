import { Loader } from "lucide-react";
import { lazy } from "react";

export const AdminPage = lazy(() =>
  import("@/pages/AdminPage/AdminPage").then((m) => ({ default: m.AdminPage })),
);
export const HomePage = lazy(() =>
  import("@/pages/HomePage/HomePage").then((m) => ({ default: m.HomePage })),
);
export const AlbumPage = lazy(() =>
  import("@/pages/AlbumPage/AlbumPage").then((m) => ({ default: m.AlbumPage })),
);
export const ChatPage = lazy(() =>
  import("@/pages/ChatPage/ChatPage").then((m) => ({ default: m.ChatPage })),
);
export const ChatIdPage = lazy(() =>
  import("@/pages/ChatPage/ChatIdPage").then((m) => ({
    default: m.ChatIdPage,
  })),
);
export const MadeForYouSongsPage = lazy(() =>
  import("@/pages/SongsPage/MadeForYouSongsPage").then((m) => ({
    default: m.MadeForYouSongsPage,
  })),
);
export const TrendingSongsPage = lazy(() =>
  import("@/pages/SongsPage/TrendingSongsPage").then((m) => ({
    default: m.TrendingSongsPage,
  })),
);

export const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader className="size-8 text-emerald-500 animate-spin" />
  </div>
);

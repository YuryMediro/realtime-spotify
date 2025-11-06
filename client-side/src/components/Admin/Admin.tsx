import { HeaderAdmin } from "@/widgets/Layout/UI/HeaderAdmin/HeaderAdmin";
import { observer } from "mobx-react-lite";
import { Statistics } from "./Statistics/Statistics";
import { musicStore } from "@/entities/store/music-store";
import { useEffect } from "react";
import { TabsAdmin } from "./TabsAdmin/TabsAdmin";
import { useAdmin } from "@/shared/hooks/useAdmin/useAdmin";

export const Admin = observer(() => {
  const { data: adminStatus, isLoading } = useAdmin();
  const isAdmin = adminStatus?.admin || false;

  const { fetchStatistics, fetchSongs, fetchAlbums } = musicStore;

  useEffect(() => {
    fetchStatistics();
    fetchSongs();
    fetchAlbums();
  }, []);

  if (!isAdmin && !isLoading) return <div>You are not admin</div>;
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <HeaderAdmin />
      <Statistics />
      <TabsAdmin />
    </div>
  );
});

import { HeaderAdmin } from "@/widgets/Layout/UI/HeaderAdmin/HeaderAdmin";
import { Statistics } from "./Statistics/Statistics";
import { TabsAdmin } from "./TabsAdmin/TabsAdmin";
import { useAdmin } from "@/shared/hooks/ApiHooks/useAdmin/useAdmin";

export const Admin = () => {
  const { data: adminStatus, isLoading } = useAdmin();
  const isAdmin = adminStatus?.admin || false;

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
};

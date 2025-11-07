import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { updateApiToken } from "../shared/api/axios";
import { observer } from "mobx-react-lite";
import { chatStore } from "@/entities/store/chat-store";
import { playerStore } from "@/entities/store/player-store";
import { useAdmin } from "@/shared/hooks/ApiHooks/useAdmin/useAdmin";

const AuthProvider = observer(({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { initSocket, disconnectSocket } = chatStore;
  const { refetch: checkAdminStatus } = useAdmin();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
          if (userId) initSocket(userId);
          if (userId) playerStore.setUserId(userId);
        }
      } catch (error) {
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => disconnectSocket();
  }, [getToken, userId, checkAdminStatus, initSocket, disconnectSocket]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>;
});

export default AuthProvider;

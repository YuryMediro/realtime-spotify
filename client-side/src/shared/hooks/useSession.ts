import { useAuth, useSession } from "@clerk/clerk-react";
import { useEffect } from "react";
import { updateApiToken } from "@/shared/api/axios";

export const useTokenRefresh = () => {
  const { getToken } = useAuth();
  const { session } = useSession();

  useEffect(() => {
    const updateToken = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    };

    updateToken();

    const interval = setInterval(updateToken, 25 * 1000);

    return () => clearInterval(interval);
  }, [getToken, session]);
};

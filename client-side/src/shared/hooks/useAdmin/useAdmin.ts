import { adminApi } from "@/entities/endpoints/admin-api";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = () => {
  return useQuery({
    queryKey: ['admin', 'status'],
    queryFn: () => adminApi.getAdmin()
  });
};

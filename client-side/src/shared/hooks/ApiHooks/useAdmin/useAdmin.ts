import { adminService } from "@/shared/api/service/admin.service";
import { useQuery } from "@tanstack/react-query";

export const useAdmin = () => {
  return useQuery({
    queryKey: ['admin', 'status'],
    queryFn: () => adminService.checkAdminStatus()
  });
};

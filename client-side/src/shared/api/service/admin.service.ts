import { axiosInstance } from "../axios";
import { API_URL } from "../config/api.config";

interface AdminStatus {
    admin: boolean
}

class AdminService {
    async checkAdminStatus() {
        const { data } = await axiosInstance<AdminStatus>({
            url: API_URL.admin(),
            method: 'GET',
        })
        return data
    }
}

export const adminService = new AdminService();
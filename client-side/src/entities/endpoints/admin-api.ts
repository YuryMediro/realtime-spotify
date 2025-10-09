import { axiosInstance } from '@/shared/api/axios'

export const adminApi = {
	getAdmin: (): Promise<{ admin: boolean }> =>
		axiosInstance.get<{ admin: boolean }>('/admin').then(res => res.data),
}

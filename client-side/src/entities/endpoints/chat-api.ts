import type { IUser } from '@/entities/types/type'
import { axiosInstance } from '../../shared/api/axios'

export const usersApi = {
	getUsers: (): Promise<IUser[]> =>
		axiosInstance.get<IUser[]>('/users').then(res => res.data),
}

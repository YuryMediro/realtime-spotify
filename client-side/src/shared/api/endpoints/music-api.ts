import type { IAlbums } from '@/entities/types/type'
import { axiosInstance } from '../axios'

export const musicApi = {
	getALbums: (): Promise<IAlbums[]> =>
		axiosInstance.get<IAlbums[]>('/albums').then(res => res.data),
}

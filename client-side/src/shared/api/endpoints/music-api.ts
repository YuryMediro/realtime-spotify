import type { IAlbums } from '@/entities/types/type'
import { axiosInstance } from '../axios'

export const musicApi = {
	getALbums: (): Promise<IAlbums[]> =>
		axiosInstance.get<IAlbums[]>('/albums').then(res => res.data),

	getAlbumsById: (id: string): Promise<IAlbums> =>
		axiosInstance.get<IAlbums>(`/albums/${id}`).then(res => res.data),
}

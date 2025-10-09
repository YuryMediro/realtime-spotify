import type { IAlbums, ISongs } from '@/entities/types/type'
import { axiosInstance } from '../../shared/api/axios'

export const musicApi = {
	// Альбомы
	getALbums: (): Promise<IAlbums[]> =>
		axiosInstance.get<IAlbums[]>('/albums').then(res => res.data),

	getAlbumsById: (id: string): Promise<IAlbums> =>
		axiosInstance.get<IAlbums>(`/albums/${id}`).then(res => res.data),

	// Песни
	getFeaturedSongs: (): Promise<ISongs[]> =>
		axiosInstance.get<ISongs[]>('/songs/featured').then(res => res.data),
}

import type { IAlbums, ISongs, IStatistics } from '@/entities/types/type'
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

	getMadeForYouSongs: (): Promise<ISongs[]> =>
		axiosInstance.get<ISongs[]>('/songs/made-for-you').then(res => res.data),

	getTrendingSongs: (): Promise<ISongs[]> =>
		axiosInstance.get<ISongs[]>('/songs/trending').then(res => res.data),

		// Статистика
		getStatistics: (): Promise<IStatistics> => axiosInstance.get<IStatistics>('/stats').then(res => res.data) 
}

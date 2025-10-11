import { musicApi } from '@/entities/endpoints/music-api'
import type { IAlbums, ISongs, IStatistics } from '@/entities/types/type'
import { makeAutoObservable } from 'mobx'
import toast from 'react-hot-toast'

class MusicStore {
	songs: ISongs[] = []
	albums: IAlbums[] = []
	currentAlbum: IAlbums | null = null
	isLoading: boolean = false
	error: string | null = null
	featuredSongs: ISongs[] = []
	madeForYouSongs: ISongs[] = []
	trendingSongs: ISongs[] = []
	stats: IStatistics = {
		totalSongs: 0,
		totalAlbums: 0,
		totalUsers: 0,
		totalArtists: 0,
	}

	constructor() {
		makeAutoObservable(this)
	}

	setSongs = (songs: ISongs[]): void => {
		this.songs = songs
	}
	setAlbums = (albums: IAlbums[]): void => {
		this.albums = albums
	}
	setCurrentAlbum = (album: IAlbums): void => {
		this.currentAlbum = album
	}
	setLoading = (loading: boolean): void => {
		this.isLoading = loading
	}
	setError = (error: string | null): void => {
		this.error = error
	}
	setFeaturedSongs = (songs: ISongs[]): void => {
		this.featuredSongs = songs
	}
	setMadeForYouSongs = (songs: ISongs[]): void => {
		this.madeForYouSongs = songs
	}
	setTrendingSongs = (songs: ISongs[]): void => {
		this.trendingSongs = songs
	}
	setStatistics = (stats: IStatistics): void => {
		this.stats = stats
	}

	fetchAlbums = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)
		try {
			const albums = await musicApi.getALbums()
			this.setAlbums(albums)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchAlbumsById = async (id: string): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const album = await musicApi.getAlbumsById(id)
			this.setCurrentAlbum(album)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchSongs = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const songs = await musicApi.getSongs()
			this.setSongs(songs)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchFeaturedSongs = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const songs = await musicApi.getFeaturedSongs()
			this.setFeaturedSongs(songs)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchMadeForYouSongs = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const songs = await musicApi.getMadeForYouSongs()
			this.setMadeForYouSongs(songs)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchTrendingSongs = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const songs = await musicApi.getTrendingSongs()
			this.setTrendingSongs(songs)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchStatistics = async (): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			const stats = await musicApi.getStatistics()
			this.setStatistics(stats)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	deleteSong = async (id: string): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			await musicApi.deleteSong(id)
			this.songs = this.songs.filter(song => song._id !== id)

			await this.fetchStatistics()

			toast.success('Song deleted successfully')
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
			toast.error(error.message || 'Error deleting song')
		} finally {
			this.setLoading(false)
		}
	}

	deleteAlbumById = async (id: string): Promise<void> => {
		this.setLoading(true)
		this.setError(null)

		try {
			await musicApi.deleteAlbumById(id)
			this.albums = this.albums.filter(album => album._id !== id)

			await this.fetchStatistics()

			toast.success('Album deleted successfully')
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
			toast.error(error.message || 'Error deleting album')
		} finally {
			this.setLoading(false)
		}
	}
}

export const musicStore = new MusicStore()

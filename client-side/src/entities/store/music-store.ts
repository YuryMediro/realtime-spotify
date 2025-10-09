import { musicApi } from '@/entities/endpoints/music-api'
import type { IAlbums } from '@/entities/types/type'
import { makeAutoObservable } from 'mobx'

class MusicStore {
	albums: IAlbums[] = []
	currentAlbum: IAlbums | null = null
	isLoading = true
	error = ''

	constructor() {
		makeAutoObservable(this)
	}

	setAlbums = (albums: IAlbums[]) => {
		this.albums = albums
	}
	setCurrentAlbum = (album: IAlbums) => {
		this.currentAlbum = album
	}
	setLoading = (loading: boolean) => {
		this.isLoading = loading
	}
	setError = (error: string) => {
		this.error = error
	}

	fetchAlbums = async () => {
		this.setLoading(true)
		this.setError('')
		try {
			const albums = await musicApi.getALbums()
			this.setAlbums(albums)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}

	fetchAlbumsById = async (id: string) => {
		this.setLoading(true)
		this.setError('')

		try {
			const album = await musicApi.getAlbumsById(id)
			this.setCurrentAlbum(album)
		} catch (error: any) {
			this.setError(error.response?.data?.message || error.message)
		} finally {
			this.setLoading(false)
		}
	}
}

export const musicStore = new MusicStore()

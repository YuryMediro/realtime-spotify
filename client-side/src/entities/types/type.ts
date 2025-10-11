export interface ISongs {
	_id: string
	title: string
	artist: string
	imageUrl: string
	audioUrl: string
	duration: number
	createdAt: string
	updatedAt: string
	albumId: string | null
}

export interface IAlbums {
	_id: string
	title: string
	artist: string
	imageUrl: string
	releaseYear: number
	songs: ISongs[]
}

export interface IUser {
	_id: string
	fullName: string
	imageUrl: string
	clerkId: string
}

export interface IStatistics {
	totalAlbums: number
	totalSongs: number
	totalUsers: number
	totalArtists: number
}

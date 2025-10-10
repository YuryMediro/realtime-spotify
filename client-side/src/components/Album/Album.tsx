import { musicStore } from '@/entities/store/music-store'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ScrollArea } from '../kit/scroll-area'
import { AlbumContent } from './AlbumContent/AlbumContent'
import { PlayButton } from './AlbumContent/PlayButton'
import { AlbumTable } from './AlbumContent/AlbumTable'
import { observer } from 'mobx-react-lite'

export const Album = observer(() => {
	const { albumId } = useParams()
	const { fetchAlbumsById, isLoading, currentAlbum } = musicStore
	useEffect(() => {
		if (albumId) fetchAlbumsById(albumId)
	}, [albumId])

	if (isLoading) return null

	return (
		<div className={'h-full'}>
			<ScrollArea className={'h-full rounded-md'}>
				<div className={'min-h-full'}>
					<div
						className={
							'absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'
						}
						aria-hidden='true'
					/>
					<AlbumContent currentAlbum={currentAlbum} />
					<PlayButton />

					<AlbumTable currentAlbum={currentAlbum} />
				</div>
			</ScrollArea>
		</div>
	)
})

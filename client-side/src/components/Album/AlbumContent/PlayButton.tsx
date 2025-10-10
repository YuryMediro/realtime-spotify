import { Button } from '@/components/kit/button'
import { musicStore } from '@/entities/store/music-store'
import { playerStore } from '@/entities/store/player-store'
import { Pause, Play } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const PlayButton = observer(() => {
	const { currentAlbum } = musicStore
	const { isPlaying, currentSong } = playerStore

	const handlePlayAll = () => {
		if (currentAlbum?.songs) {
			const isCurrentAlbumPlaying = currentAlbum.songs.some(
				song => song._id === currentSong?._id
			)
			if (isCurrentAlbumPlaying) {
				playerStore.togglePlay()
			} else {
				playerStore.playAlbum(currentAlbum.songs, 0)
			}
		}
	}
	return (
		<div className='px-6 pb-4 flex items-center gap-6'>
			<Button
				size='icon'
				className='w-14 h-14 rounded-full bg-green-400 hover:bg-green-400 
                hover:scale-105 transition-all'
				onClick={handlePlayAll}
			>
				{isPlaying ? (
					<Pause className='h-7 w-7 text-black' />
				) : (
					<Play className='h-7 w-7 text-black' />
				)}
			</Button>
		</div>
	)
})

import { Button } from '@/components/kit/button'
import { musicStore } from '@/entities/store/music-store'
import { playerStore } from '@/entities/store/player-store'
import { usePlayAlbum } from '@/shared/hooks/usePlaySong'
import { Pause, Play } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const PlayButton = observer(() => {
	const { isPlaying, currentSong } = playerStore
	const { currentAlbum } = musicStore
	const { handlePlayAll } = usePlayAlbum()
	const isAlbumPlaying = currentAlbum?.songs?.some(
		song => song._id === currentSong?._id
	)

	return (
		<div className='px-6 pb-4 flex items-center gap-6'>
			<Button
				size='icon'
				className='w-14 h-14 rounded-full bg-green-400 hover:bg-green-400 
                hover:scale-105 transition-all'
				onClick={handlePlayAll}
			>
				{isAlbumPlaying && isPlaying ? (
					<Pause className='h-7 w-7 text-black' />
				) : (
					<Play className='h-7 w-7 text-black' />
				)}
			</Button>
		</div>
	)
})

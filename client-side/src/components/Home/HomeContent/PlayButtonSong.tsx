import { Button } from '@/components/kit/button'
import { playerStore } from '@/entities/store/player-store'
import type { ISongs } from '@/entities/types/type'
import { Pause, Play } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const PlayButtonSong = observer(({ song }: { song: ISongs }) => {
	const { isPlaying, currentSong, setCurrentSong,togglePlay } = playerStore
	const isCurrentSong = currentSong?._id === song._id

	const handlePlay = () => {
		if (isCurrentSong) togglePlay()
		else setCurrentSong(song)
	}
	return (
		<Button
			size={'icon'}
			onClick={handlePlay}
			className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
					isCurrentSong ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
				}`}
		>
			{isCurrentSong && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
		</Button>
	)
})

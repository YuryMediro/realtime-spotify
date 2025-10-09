import { Button } from '@/components/kit/button'
import { Pause, Play } from 'lucide-react'

export const PlayButtonSong = () => {
	const isCurrentSong = true
	const isPlaying = true
	return (
		<Button
			size={'icon'}
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
}

import { Button } from '@/components/kit/button'
import { Pause, Play } from 'lucide-react'

interface PlayButtonProps {}

export const PlayButton = ({}: PlayButtonProps) => {
	return (
		<div className='px-6 pb-4 flex items-center gap-6'>
			<Button
				size='icon'
				className='w-14 h-14 rounded-full bg-green-400 hover:bg-green-400 
                hover:scale-105 transition-all'
			>
				<Play className='h-7 w-7 text-black' />
			</Button>
		</div>
	)
}

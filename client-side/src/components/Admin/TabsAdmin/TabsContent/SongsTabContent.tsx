import { Button } from '@/components/kit/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
} from '@/components/kit/card'
import { Music } from 'lucide-react'
import { SongsTable } from '../../TableContent/SongsTable'

export const SongsTabContent = () => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Music className='size-5 text-emerald-500' />
					Songs Library
				</CardTitle>
				<CardDescription>Manage your music tracks</CardDescription>
				<CardAction>
					<Button variant='link'>Add Song</Button>
				</CardAction>
			</CardHeader>
			<CardContent className='grid gap-6'>
                <SongsTable/>
            </CardContent>
		</Card>
	)
}

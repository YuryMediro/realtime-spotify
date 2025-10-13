import { Button } from '@/components/kit/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
} from '@/components/kit/card'
import { Music, Plus } from 'lucide-react'
import { SongsTable } from '../../TableContent/SongsTable'
import { CreateAlbumSongModal } from '@/components/kit/modals/CreateAlbumSongModal'

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
					<CreateAlbumSongModal
						title='Add New Song'
						subTitle='Add a new song to your music library'
						type='song'
					>
						<Button className='bg-emerald-500 hover:bg-emerald-600 text-black'>
							<Plus className='mr-2 h-4 w-4' />
							Add Song
						</Button>
					</CreateAlbumSongModal>
				</CardAction>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<SongsTable />
			</CardContent>
		</Card>
	)
}

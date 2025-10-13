import { Button } from '@/components/kit/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
} from '@/components/kit/card'
import { Library, Plus } from 'lucide-react'
import { AlbumsTable } from '../../TableContent/AlbumsTable'
import { CreateAlbumSongModal } from '@/components/kit/modals/CreateAlbumSongModal'

export const AlbumsTabContent = () => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50'>
			<CardHeader>
				<CardTitle className='flex items-center gap-2'>
					<Library className='size-5 text-emerald-500' />
					Albums Library
				</CardTitle>
				<CardDescription>Manage your album collection</CardDescription>
				<CardAction>
					<CreateAlbumSongModal title='Add New Album' subTitle='Add a new album to your collection' type='album'>
						<Button className='bg-violet-500 hover:bg-violet-600 text-white'>
							<Plus className='mr-2 h-4 w-4' />
							Add Album
						</Button>
					</CreateAlbumSongModal>
				</CardAction>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<AlbumsTable />
			</CardContent>
		</Card>
	)
}

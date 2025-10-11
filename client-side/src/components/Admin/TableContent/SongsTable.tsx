import { Button } from '@/components/kit/button'
import { ConfirmModal } from '@/components/kit/modals/ConfirmModal'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/kit/table'
import { musicStore } from '@/entities/store/music-store'
import { Calendar, Trash2 } from 'lucide-react'
import { observer } from 'mobx-react-lite'

export const SongsTable = observer(() => {
	const { songs, deleteSong, isLoading } = musicStore
	return (
		<Table>
			<TableHeader>
				<TableRow className='hover:bg-transparent'>
					<TableHead className='w-[50px]'></TableHead>
					<TableHead className='text-sm text-zinc-400'>Title</TableHead>
					<TableHead className='text-sm text-zinc-400'>Artist</TableHead>
					<TableHead className='text-sm text-zinc-400'>Release Date</TableHead>
					<TableHead className='text-zinc-400 text-right'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{songs.map(song => (
					<TableRow key={song._id} className='hover:bg-zinc-800/50'>
						<TableCell className='flex items-center gap-2'>
							<img
								src={song.imageUrl}
								alt={song.title}
								className='size-10 rounded object-cover'
							/>
						</TableCell>
						<TableCell className='font-medium'>{song.title}</TableCell>
						<TableCell>{song.artist}</TableCell>
						<TableCell>
							<span className='flex items-center gap-1 text-zinc-400'>
								<Calendar className='h-4 w-4' />
								{song.createdAt.split('T')[0].split('-').reverse().join('/')}
							</span>
						</TableCell>
						<TableCell className='text-right'>
							<ConfirmModal handleClick={() => deleteSong(song._id)}>
								<Button
									variant={'ghost'}
									size={'sm'}
                                    disabled={isLoading}
									className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
								>
									<Trash2 className='size-4' />
								</Button>
							</ConfirmModal>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
})

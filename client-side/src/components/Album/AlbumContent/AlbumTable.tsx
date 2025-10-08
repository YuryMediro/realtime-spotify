import { Clock, Play } from 'lucide-react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../kit/table'
import { formatDuration } from '@/shared/lib/format/formatDuration'
import type { IAlbums } from '@/entities/types/type'

interface AlbumTableProps {
	currentAlbum: IAlbums | null
}

export const AlbumTable = ({ currentAlbum }: AlbumTableProps) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className='text-sm text-zinc-400'>#</TableHead>
					<TableHead className='text-sm text-zinc-400'>Title</TableHead>
					<TableHead className='text-sm text-zinc-400'>Released Date</TableHead>
					<TableHead className='text-zinc-400'>
						<Clock className='h-4 w-4' />
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{currentAlbum?.songs.map((song, index) => {
					return (
						<TableRow
							key={song._id}
							className='group cursor-pointer text-sm 
                      text-zinc-400 hover:bg-white/5'
						>
							<TableCell className={'w-[44px]'}>
								<span className='group-hover:hidden'>{index + 1}</span>
								<Play className='h-4 w-4 hidden group-hover:block' />
							</TableCell>
							<TableCell className='flex items-center gap-2'>
								<img src={song.imageUrl} alt={song.title} className='size-10' />
								<div>
									<p className='font-medium text-white'>{song.title}</p>
									<p>{song.artist}</p>
								</div>
							</TableCell>

							<TableCell>
								{song.createdAt.split('T')[0].split('-').reverse().join('/')}
							</TableCell>
							<TableCell>{formatDuration(song.duration)}</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}

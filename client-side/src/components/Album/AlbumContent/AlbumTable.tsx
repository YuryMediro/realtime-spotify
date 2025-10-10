import { Clock } from 'lucide-react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '../../kit/table'
import { formatDuration } from '@/shared/lib/format/formatDuration'
import type { IAlbums, ISongs } from '@/entities/types/type'
import { observer } from 'mobx-react-lite'
import { playerStore } from '@/entities/store/player-store'

interface AlbumTableProps {
	currentAlbum: IAlbums | null
}

export const AlbumTable = observer(({ currentAlbum }: AlbumTableProps) => {
	const { currentSong, isPlaying } = playerStore

	const handlePlayTrack = (song: ISongs) => {
		if (currentSong?._id === song._id) {
			playerStore.togglePlay()
		} else {
			playerStore.initializeQueue(currentAlbum!.songs)
			playerStore.setCurrentSong(song)
		}
	}
	return (
		<Table>
			<TableHeader>
				<TableRow className='hover:bg-transparent'>
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
					const isCurrentSong = currentSong?._id === song._id
					return (
						<TableRow
							onClick={() => handlePlayTrack(song)}
							key={song._id}
							className={`group cursor-pointer text-sm 
                      text-zinc-400 hover:bg-white/5 ${
												isCurrentSong ? 'bg-white/10' : ''
											}`}
						>
							<TableCell className={'w-[44px]'}>
								{isCurrentSong && isPlaying ? (
									<div className='size-4 text-green-500'>♫</div>
								) : (
									<span>{index + 1}</span>
								)}
							</TableCell>
							<TableCell className='flex items-center gap-2'>
								<img src={song.imageUrl} alt={song.title} className='size-10' />
								<div>
									<p
										className={`font-medium ${
											isCurrentSong ? 'text-green-400' : 'text-white'
										}  `}
									>
										{song.title}
									</p>
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
})

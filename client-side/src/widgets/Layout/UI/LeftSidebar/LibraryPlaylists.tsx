import { ScrollArea } from '@/components/kit/scroll-area'
import { PlayListSkeleton } from '@/shared/ui/skeleton/PlayListSkeleton'
import { musicStore } from '@/entities/store/music-store'
import { Library } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LibraryPlaylists = () => {
	const { albums, isLoading, fetchAlbums } = musicStore
	useEffect(() => {
		fetchAlbums()
	}, [fetchAlbums])

	return (
		<div className='flex-1 rounded-lg bg-zinc-900 p-4'>
			<div className='mb-4'>
				<div className='flex items-center text-white px-2'>
					<Library className='mr-2 size-5' />
					<span className='hidden md:inline'>Playlist</span>
				</div>
			</div>

			<ScrollArea className={'h-[calc(100vh-300px)]'}>
				<div className={'space-y-2'}>
					{isLoading ? (
						<PlayListSkeleton />
					) : (
						albums.map(album => (
							<Link
								to={`/albums/${album._id}`}
								key={album._id}
								className='p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer'
							>
								<img
									src={album.imageUrl}
									alt={'album img'}
									className='size-12 rounded-md flex-shrink-0 object-cover'
								/>
								<div className='flex-1 min-w-0 hidden md:block'>
									<p className='font-medium truncate'>{album.title}</p>
									<p className='text-sm text-zinc-400 truncate'>
										Album • {album.artist}
									</p>
								</div>
							</Link>
						))
					)}
				</div>
			</ScrollArea>
		</div>
	)
}

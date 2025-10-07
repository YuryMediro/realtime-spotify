import { ScrollArea } from '@/components/ui/scroll-area'
import { PlayListSkeleton } from '@/shared/ui/skeleton/PlayListSkeleton'
import { Library } from 'lucide-react'

export const LibraryPlaylists = () => {
	const isLoading = true
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
					{isLoading ? <PlayListSkeleton /> : <div>Some playlist</div>}
				</div>
			</ScrollArea>
		</div>
	)
}

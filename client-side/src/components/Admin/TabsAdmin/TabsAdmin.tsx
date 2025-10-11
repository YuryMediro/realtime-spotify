import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/kit/tabs'
import { Album, Music } from 'lucide-react'
import { SongsTabContent } from './TabsContent/SongsTabContent'
import { AlbumsTabContent } from './TabsContent/AlbumsTabContent'

export const TabsAdmin = () => {
	return (
		<Tabs defaultValue='songs' className='space-y-6'>
			<TabsList className='p-1 bg-zinc-800/50'>
				<TabsTrigger value='songs' className='cursor-pointer'>
					<Music className='mr-2 size-4' />
					Songs
				</TabsTrigger>
				<TabsTrigger value='albums' className='cursor-pointer'>
					<Album className='mr-2 size-4' />
					Albums
				</TabsTrigger>
			</TabsList>
			<TabsContent value='songs'>
				<SongsTabContent />
			</TabsContent>
			<TabsContent value='albums'>
				<AlbumsTabContent />
			</TabsContent>
		</Tabs>
	)
}

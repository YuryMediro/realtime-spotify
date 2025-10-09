import { TopBar } from '@/widgets/TopBar/TopBar'
import { ScrollArea } from '../kit/scroll-area'
import { FeaturedSection } from './HomeContent/FeaturedSection'
import { musicStore } from '@/entities/store/music-store'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

export const Home = observer(() => {
	const { fetchFeaturedSongs, featuredSongs } = musicStore
	useEffect(() => {
		fetchFeaturedSongs()
	}, [])
	console.log(featuredSongs, 'featuredSongs')
	return (
		<main className='rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900'>
			<TopBar />

			<ScrollArea className='h-[calc(100vh-180px)]'>
				<div className='p-4 sm:p-6'>
					<h1 className='text-2xl sm:text-3xl font-bold mb-6'>
						Good afternoon
					</h1>
					<FeaturedSection />
				</div>
			</ScrollArea>
		</main>
	)
})

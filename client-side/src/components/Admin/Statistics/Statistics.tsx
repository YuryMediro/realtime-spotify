import { musicStore } from '@/entities/store/music-store'
import { observer } from 'mobx-react-lite'
import { StatisticsItem } from './StatisticsItem'
import { Library, ListMusic, PlayCircle, Users2 } from 'lucide-react'

export const Statistics = observer(() => {
	const { stats } = musicStore

	const statsItem = [
		{
			icon: ListMusic,
			title: 'Total Songs',
			value: stats.totalSongs.toString(),
			bgColor: 'bg-emerald-500/10',
			iconColor: 'text-emerald-500',
		},
		{
			icon: Library,
			title: 'Total Albums',
			value: stats.totalAlbums.toString(),
			bgColor: 'bg-violet-500/10',
			iconColor: 'text-violet-500',
		},
		{
			icon: Users2,
			title: 'Total Artists',
			value: stats.totalArtists.toString(),
			bgColor: 'bg-orange-500/10',
			iconColor: 'text-orange-500',
		},
		{
			icon: PlayCircle,
			title: 'Total Users',
			value: stats.totalUsers.toString(),
			bgColor: 'bg-sky-500/10',
			iconColor: 'text-sky-500',
		},
	]
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 '>
			{statsItem.map(stat => (
				<StatisticsItem
					key={stat.title}
					icon={stat.icon}
					title={stat.title}
					value={stat.value}
					bgColor={stat.bgColor}
					iconColor={stat.iconColor}
				/>
			))}
		</div>
	)
})

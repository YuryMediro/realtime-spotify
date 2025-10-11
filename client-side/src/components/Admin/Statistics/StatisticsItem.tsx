import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/kit/card'
import type { ElementType } from 'react'

interface StatisticsItemProps {
	title: string
	value: string
	icon: ElementType
	bgColor: string
	iconColor: string
}

export const StatisticsItem = ({
	icon: Icon,
	title,
	value,
	bgColor,
	iconColor,
}: StatisticsItemProps) => {
	return (
		<Card className='bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors'>
			<CardContent className='p-6 flex items-center gap-4'>
				<CardTitle className={`p-3 rounded-lg ${bgColor}`}>
					<Icon className={`size-6 ${iconColor}`} />
				</CardTitle>
				<CardDescription>
					<p className='text-sm text-zinc-400'>{title}</p>
					<p className='text-2xl font-bold'>{value}</p>
				</CardDescription>
			</CardContent>
		</Card>
	)
}

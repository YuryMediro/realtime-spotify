import { Button } from '@/components/kit/button'
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardAction,
} from '@/components/kit/card'
import { Library } from 'lucide-react'
import { AlbumsTable } from '../../TableContent/AlbumsTable'

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
					<Button variant='link'>Add Album</Button>
				</CardAction>
			</CardHeader>
			<CardContent className='grid gap-6'>
				<AlbumsTable />
			</CardContent>
		</Card>
	)
}

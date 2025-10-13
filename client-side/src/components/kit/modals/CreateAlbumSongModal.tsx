import { useState, type PropsWithChildren } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../dialog'
import { AlbumCreateForm } from '@/components/Admin/TabsAdmin/CreateForm/AlbumCreateForm'

interface CreateAlbumSongModalProps {
	title: string
	subTitle: string
}

export const CreateAlbumSongModal = ({
	children,
	title,
	subTitle,
}: PropsWithChildren<CreateAlbumSongModalProps>) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className='bg-zinc-900 border-zinc-700'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{subTitle}</DialogDescription>
				</DialogHeader>

				<AlbumCreateForm onClose={() => setIsOpen(false)} />
			</DialogContent>
		</Dialog>
	)
}

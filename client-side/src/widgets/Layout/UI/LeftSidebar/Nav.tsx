import { buttonVariants } from '@/components/kit/button'
import { cn } from '@/shared/lib/utils'
import { SignedIn } from '@clerk/clerk-react'
import { HomeIcon, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Nav = () => {
	return (
		<div className='rounded-lg bg-zinc-900 p-4'>
			<div className='space-y-2'>
				<Link
					to={'/'}
					className={cn(
						buttonVariants({
							variant: 'ghost',
							className: 'w-full justify-start text-white hover:bg-zinc-800',
						})
					)}
				>
					<HomeIcon className='mr-2 size-5' />
					<span className='hidden md:inline'> Home</span>
				</Link>
				<SignedIn>
					<Link
						to={'/chat'}
						className={cn(
							buttonVariants({
								variant: 'ghost',
								className: 'w-full justify-start text-white hover:bg-zinc-800',
							})
						)}
					>
						<MessageCircle className='mr-2 size-5' />
						<span className='hidden md:inline'> Message</span>
					</Link>
				</SignedIn>
			</div>
		</div>
	)
}

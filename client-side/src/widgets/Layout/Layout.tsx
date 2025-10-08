import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/kit/resizable'
import { Outlet } from 'react-router-dom'
import { LeftSidebar } from './UI/LeftSidebar/LeftSidebar'
import { FriendsSidebar } from './UI/FriendsSidebar/FriendsSidebar'

export const Layout = () => {
	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2' >

				<ResizablePanel defaultSize={20} maxSize={30} minSize={10} className='hidden md:block'>
					<LeftSidebar />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors hidden md:block' />

				<ResizablePanel defaultSize={80} className='md:default-size-60'>
					<Outlet />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors hidden md:block' />

				<ResizablePanel
					defaultSize={20}
					minSize={0}
					maxSize={25}
					collapsedSize={0}
					className='hidden md:block'
				>
					<FriendsSidebar/>
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom'
import { LeftSidebar } from './UI/LeftSidebar/LeftSidebar'

export const Layout = () => {
	return (
		<div className={'h-screen bg-black text-white flex flex-col'}>
			<ResizablePanelGroup direction='horizontal'>
				<ResizablePanel defaultSize={20} maxSize={30}>
					<LeftSidebar />
				</ResizablePanel>
				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />
				<ResizablePanel>
					<Outlet />
				</ResizablePanel>
				<ResizablePanel
					defaultSize={20}
					minSize={0}
					maxSize={25}
					collapsedSize={0}
				>
					Chat
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	)
}

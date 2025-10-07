import { LibraryPlaylists } from './LibraryPlaylists'
import { Nav } from './Nav'

export const LeftSidebar = () => {
	return (
		<div className='h-full flex flex-col gap-2'>
			<Nav />
			<LibraryPlaylists />
		</div>
	)
}

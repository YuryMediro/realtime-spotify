import { adminStore } from '@/entities/store/admin-store'
import { HeaderAdmin } from '@/widgets/Layout/UI/HeaderAdmin/HeaderAdmin'
import { observer } from 'mobx-react-lite'

export const Admin = observer(() => {
	const { isAdmin, isLoading } = adminStore

	if (!isAdmin && !isLoading) return <div>You are not admin</div>
	return (
		<div
			className='min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8'
		>
			<HeaderAdmin />
		</div>
	)
})

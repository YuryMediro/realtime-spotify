import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'
import { Loader } from 'lucide-react'
import { updateApiToken } from '../api/axios'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { getToken } = useAuth()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const initAuth = async () => {
			try {
				const token = await getToken()
				updateApiToken(token)
			} catch (error) {
				updateApiToken(null)
			} finally {
				setLoading(false)
			}
		}

		initAuth()
	}, [getToken])

	if (loading)
		return (
			<div className='h-screen w-full flex items-center justify-center'>
				<Loader className='size-8 text-emerald-500 animate-spin' />
			</div>
		)

	return <>{children}</>
}

export default AuthProvider

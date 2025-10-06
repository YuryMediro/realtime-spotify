import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { Route, Routes } from 'react-router-dom'

export const AppRoute = () => {
	return (
		<Routes>
			<Route path={'/'} element={<HomePage />} />
			<Route path={'/auth-callback'} element={<AuthCallbackPage />} />
		</Routes>
	)
}

import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { Layout } from '@/widgets/Layout/Layout'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'

export const AppRoute = () => {
	return (
		<Routes>
			<Route path={'/sso-callback'} element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />
			<Route path={'/auth-callback'} element={<AuthCallbackPage />} />

			<Route element={<Layout/>}>
			<Route path={'/'} element={<HomePage />} />
			</Route>
		</Routes>
	)
}

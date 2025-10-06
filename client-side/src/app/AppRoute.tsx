import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'

export const AppRoute = () => {
	return (
		<Routes>
			<Route path={'/sso-callback'} element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />} />
			<Route path={'/'} element={<HomePage />} />
			<Route path={'/auth-callback'} element={<AuthCallbackPage />} />
		</Routes>
	)
}

import { AdminPage } from '@/pages/AdminPage/AdminPage'
import { AlbumPage } from '@/pages/AlbumPage/AlbumPage'
import { AuthCallbackPage } from '@/pages/AuthCallbackPage/AuthCallbackPage'
import { ChatPage } from '@/pages/ChatPage/ChatPage'
import { HomePage } from '@/pages/HomePage/HomePage'
import { Layout } from '@/widgets/Layout/Layout'
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'

export const AppRoute = () => {
	return (
		<Routes>
			<Route
				path={'/sso-callback'}
				element={
					<AuthenticateWithRedirectCallback
						signUpForceRedirectUrl={'/auth-callback'}
					/>
				}
			/>
			<Route path={'/auth-callback'} element={<AuthCallbackPage />} />

			<Route element={<Layout />}>
				<Route path={'/'} element={<HomePage />} />
				<Route path={'/albums/:albumId'} element={<AlbumPage />} />
				<Route path={'/chat'} element={<ChatPage />} />
			</Route>

			<Route path={'/admin'} element={<AdminPage />} />
		</Routes>
	)
}

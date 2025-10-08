import { Button } from '@/components/kit/button'
import { useSignIn } from '@clerk/clerk-react'
import { FcGoogle } from 'react-icons/fc'

export const SingInOAuthButton = () => {
	const { signIn, isLoaded } = useSignIn()

	const handleSignIn = () => {
		if (!isLoaded) return

		signIn.authenticateWithRedirect({
			strategy: 'oauth_google',
			redirectUrl: '/sso-callback',
			redirectUrlComplete: '/auth-callback',
		})
	}

	return (
		<Button
			onClick={handleSignIn}
			variant={'secondary'}
			className='w-full h-11'
		>
			<FcGoogle />
			Continue with Google
		</Button>
	)
}

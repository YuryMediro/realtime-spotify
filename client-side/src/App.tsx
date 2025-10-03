import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
} from '@clerk/clerk-react'
import { Button } from './components/ui/button'

function App() {
	return (
		<>
			<header>
				<div className={'flex justify-center mt-6'}>
					<SignedOut>
						<SignInButton>
							<Button>Войти в RealTime Spotify</Button>
						</SignInButton>
					</SignedOut>
				</div>
				<div className={'flex justify-center mt-6'}>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</header>
		</>
	)
}

export default App

import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth/next'

const Home = async () => {
	const session = await getServerSession(authOptions)

	return (
		<main className='grow'> {/* flex items-center justify-center */}
			<p>Home page</p>

			{/* TODO: do the home page, get the 10 first new products and show them */}
			<div>
				{session ? (
					<p>Connected</p>

				) : (
					<p>Not connected</p>
				)}
			</div>
		</main>
	);
}

export default Home;
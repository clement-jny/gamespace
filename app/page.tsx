'use client';

import Link from 'next/link';
import { useSession } from '@/lib/useSession';
import { useAuth } from '@/lib/useAuth';

const Home = () => {
	// const auth = useSession();
	const auth = useAuth();

	// 	const cookieStore = cookies();
	// 	const token = cookieStore.get('token');

	// 	const user = await apiGetAuthUser();

	return (
		<main>
			<>
				<h1>Public Home Page</h1>
				<header>
					<nav>
						{auth ? (
							<p>logged in</p>
						) : (
							<Link href='/login'>Login</Link>
						)}
					</nav>
				</header>
				{/* {session}
			{!session && (
				<>
					<li>
						<Link href='/register' className='text-ct-dark-600'>
							Register
						</Link>
					</li>
					<li>
						<Link href='/login' className='text-ct-dark-600'>
							Login
						</Link>
					</li>
				</>
			)}
			{session && (
				<>
					<li>
						<Link href='/profile' className='text-ct-dark-600'>
							Profile
						</Link>
					</li>
					<li className='cursor-pointer'>
						Logout
					</li>
				</>
			)} */}
			</>
		</main>
	);
}

export default Home;
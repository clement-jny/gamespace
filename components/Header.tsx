'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Spinner } from './Spinner';
import { useSession } from '@/lib/useSession';
import useStore from '@/store';
import { apiLogoutUser } from '@/lib/api-requests';
import { useRouter } from 'next/navigation';

export const Header = () => {
	const store = useStore();
	const user = useSession();
	const router = useRouter();

	const handleLogout = async () => {
		store.setRequestLoading(true);
		try {
			await apiLogoutUser();
		} catch (error) {
		} finally {
			store.reset();
			router.push('/login');
		}
	};

	return (
		// <header>
		// 	<nav>
		// 		<div className='navbar bg-base-300'>
		// 			<div className='navbar-start'>
		// 				<Link href='/' className='btn btn-ghost normal-case text-3xl'>GameSpace.</Link>
		// 			</div>

		// 			<div className='navbar-center'>
		// 				<div className='form-control'>
		// 					<input type='text' placeholder='Search' className='input input-bordered w-24 md:w-auto' />
		// 				</div>
		// 			</div>

		// 			<div className='navbar-end'>
		// 				{
		// 					isAuth ? (
		// 						<div className='dropdown dropdown-end'>
		// 							<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
		// 								<div className='w-10 rounded-full'>
		// 									<Image
		// 										src='/images/default.jpg'
		// 										width={500}
		// 										height={500}
		// 										alt='Default user picture'
		// 									/>
		// 								</div>
		// 							</label>
		// 							<ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
		// 								<li><Link href='/account'>Dashboard</Link></li>
		// 								<li><a>Logout</a></li>
		// 								{/* <li onClick={handleLogout}>Logout</li> */}
		// 							</ul>
		// 						</div>
		// 					) : (
		// 						<ul className='menu menu-horizontal px-1'>
		// 							<li><Link href='/login'>Login</Link></li>
		// 							<li><Link href='/register'>Register</Link></li>
		// 						</ul>
		// 					)
		// 				}
		// 			</div>
		// 		</div>
		// 	</nav>
		// </header>

		<>
			<header className='bg-white h-20'>
				<nav className='h-full flex justify-between container items-center'>
					<div>
						<Link href='/' className='text-ct-dark-600 text-2xl font-semibold'>
							CodevoWeb
						</Link>
					</div>
					<ul className='flex items-center gap-4'>
						<li>
							<Link href='/' className='text-ct-dark-600'>
								Home
							</Link>
						</li>
						{!user && (
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
						{user && (
							<>
								<li>
									<Link href='/profile' className='text-ct-dark-600'>
										Profile
									</Link>
								</li>
								<li className='cursor-pointer' onClick={handleLogout}>
									Logout
								</li>
							</>
						)}
					</ul>
				</nav>
			</header>
			<div className='pt-4 pl-2 bg-ct-blue-600 fixed'>
				{store.requestLoading && <Spinner color='text-ct-yellow-600' />}
			</div>
		</>
	);
}
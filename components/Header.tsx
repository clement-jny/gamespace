'use client';

import Link from 'next/link';
import Image from 'next/image';

// import { apiLogoutUser } from '@/lib/api-requests';
// import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

export const Header = () => {
	// const router = useRouter();
	const { data: session } = useSession();
	// console.log(session);
	// console.log(JSON.stringify(session));

	return (
		<header>
			<nav>
				<div className='navbar bg-base-300'>
					<div className='navbar-start'>
						<Link href='/' className='btn btn-ghost normal-case text-3xl'>GameSpace.</Link>
					</div>

					<div className='navbar-center'>
						<div className='form-control'>
							<input type='text' placeholder='Search' className='input input-bordered w-24 md:w-auto' />
						</div>
					</div>

					<div className='navbar-end'>
						{
							session && session.user ? (
								<div className='dropdown dropdown-end'>
									<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
										<div className='w-10 rounded-full'>
											<Image
												src='/images/default.jpg'
												width={500}
												height={500}
												alt='Default user picture'
											/>
										</div>
									</label>
									<ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
										<li><Link href='/dashboard'>Dashboard</Link></li>
										{/* <li><Link href='/logout'>Logout</Link></li> */}
										<li onClick={() => signOut()}>Logout</li>
									</ul>
								</div>
							) : (
								<ul className='menu menu-horizontal px-1'>
									<li><Link href='/login'>Login</Link></li>
									<li><Link href='/register'>Register</Link></li>
								</ul>
							)
						}
					</div>
				</div>
			</nav>
		</header>
	);
}
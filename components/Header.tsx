import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { LogLinks } from './LogLinks';

export const Header = async () => {
	const session = await getServerSession(authOptions);

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
								<>
									<LogLinks user={session.user} />
								</>
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
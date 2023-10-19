import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
	const isAuth: boolean = false;

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
							isAuth ? (
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
										<li><Link href='/account'>Dashboard</Link></li>
										<li><a>Logout</a></li>
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
	)
}
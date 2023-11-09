'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const LogLinks = ({ user }: { user: { username: string } }) => {
	return (
		<div className='dropdown dropdown-end'>
			<label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
				<div className='w-10 rounded-full'>
					<div className="avatar placeholder">
						<div className="bg-neutral-focus text-neutral-content rounded-full w-10">
							<span className="text-xs">{user.username.substring(0, 2)}</span>
						</div>
					</div>
				</div>
			</label>
			<ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
				<li><Link href='/dashboard'>Dashboard</Link></li>
				<li><a onClick={() => signOut()}>Logout</a></li>
			</ul>
		</div>
	)
}

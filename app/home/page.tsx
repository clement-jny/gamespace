// import React from 'react';
// import { cookies } from 'next/headers';
// import { apiGetAuthUser } from '@/lib/api-requests';
// import { AuthPageInvisible } from '@/lib/protect-page';

'use client'
import Link from "next/link";
import { useSession } from '@/lib/useSession';

export default function Home() {
	const auth = useSession();

	// 	const cookieStore = cookies();
	// 	const token = cookieStore.get("token");

	// 	const user = await apiGetAuthUser();

	return (
		<>
			<h1>Public Home Page</h1>
			<header>
				<nav>
					{auth ? (
						<p>logged in</p>
					) : (
						<Link href="/login">Login</Link>
					)}
				</nav>
			</header>
			{/* {session}
			{!session && (
				<>
					<li>
						<Link href="/register" className="text-ct-dark-600">
							Register
						</Link>
					</li>
					<li>
						<Link href="/login" className="text-ct-dark-600">
							Login
						</Link>
					</li>
				</>
			)}
			{session && (
				<>
					<li>
						<Link href="/profile" className="text-ct-dark-600">
							Profile
						</Link>
					</li>
					<li className="cursor-pointer">
						Logout
					</li>
				</>
			)} */}
		</>
	);
}
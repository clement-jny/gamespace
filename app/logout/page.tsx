'use client'

import { useEffect } from 'react';
import useStore from '@/store';
// import { apiLogoutUser } from '@/lib/api-requests';
import { useRouter } from 'next/navigation';

export default function Logout() {
	const store = useStore();

	const router = useRouter();

	const handleLogout = async () => {
		// store.setRequestLoading(true);
		// try {
		// 	await apiLogoutUser();
		// } catch (error) {
		// } finally {
		// 	store.reset();
		// 	router.push('/login');
		// }
	};
	{/* className='cursor-pointer' onClick={handleLogout} */ }


	useEffect(() => {
		fetch('http://localhost:3000/api/auth/logout', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.status === 'success') {

					console.log('Logout!');
				} else {
					alert(data.message);

					console.log('Logout failed!');
				}
			})
			.catch(err => console.log(err));
	}, [])

	return (
		<div className='pt-4 pl-2 bg-ct-blue-600 fixed'>
			{/* {store.requestLoading && } */} {/* TODO: a spinner here  */}
		</div>
	)
}

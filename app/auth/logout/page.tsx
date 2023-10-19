'use client'

import { useEffect } from 'react'

export default function Logout() {
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
		<div>Logout</div>
	)
}

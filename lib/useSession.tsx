'use client';

import { useEffect } from 'react';
import { apiGetAuthUser } from './api-requests';
import useStore from '@/store';
import { User } from '@/lib/types';

export const useSession = () => {
	let user: User | null = null;
	let isAuth = false;
	// const store = useStore();

	const fetchUser = async () => {
		try {
			const data = await apiGetAuthUser();
			console.log(data);

			// store.setAuthUser(user);
		}
		catch (error) {
			// store.reset();
		}
	}

	useEffect(() => {
		// if (!store.authUser) {
		fetchUser();
		// }

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// return store.authUser;

	return { user, isAuth };
}
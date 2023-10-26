
'use client';

import { useEffect } from 'react';
import { apiGetAuthUser } from './api-requests';
import useStore from '@/store';

export const useSession = () => {
	const store = useStore();

	const fetchUser = async () => {
		try {
			const user = await apiGetAuthUser();
			store.setAuthUser(user);
		}
		catch (error) {
			store.reset();
		}
	}

	useEffect(() => {
		if (!store.authUser) {
			fetchUser();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return store.authUser;
}
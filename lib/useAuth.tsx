'use client';

import React from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken } from '@/lib/token';
import { JWTPayload } from 'jose';

export const useAuth = () => {
	const [auth, setAuth] = React.useState<JWTPayload | null>(null);

	const getVerifiedtoken = async () => {
		const cookies = new Cookies();
		const token = cookies.get('token') ?? null;
		const verifiedToken = await verifyJwtToken(token);

		console.log(verifiedToken);


		setAuth(verifiedToken);
	};
	React.useEffect(() => {
		getVerifiedtoken();
	}, []);
	return auth;
}
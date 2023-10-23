
'use client'
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken, verifyJWT } from '@/lib/token';
import { JWTPayload } from 'jose';

export const useSession = () => {
	const getVerifiedtoken = async () => {
		const cookies = new Cookies();
		const token = cookies.get('token');

		console.log('token => ', token);





		const verifiedToken = await verifyJwtToken(token);

		console.log(verifiedToken);
		// const verifiedToken = await verifyJWT(token);
		// console.log('verifiedToken => ', verifiedToken);

		// setAuth(verifiedToken);
	};

	useEffect(() => {
		getVerifiedtoken();
	}, []);

	return true;
}
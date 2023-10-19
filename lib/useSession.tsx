
'use client'
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { verifyJwtToken, verifyJWT } from '@/lib/token';
import { JWTPayload } from 'jose';

export const useSession = () => {
	const getVerifiedtoken = async () => {





		// const verifiedToken = await verifyJwtToken(token);
		// console.log('verifiedToken => ', token);

		// setAuth(verifiedToken);
	};

	useEffect(() => {
		getVerifiedtoken();
	}, []);

	return true;
}
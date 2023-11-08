import { ApiResponse } from './types';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export const apiRegisterUser = async (credentials: string): Promise<ApiResponse> => {
	const response = await fetch(`${BASE_URL}/api/auth/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials
	});

	return await response.json();
}

export const apiLoginUser = async (credentials: string): Promise<ApiResponse> => {
	const response = await fetch(`${BASE_URL}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials
	});

	return await response.json();
}

//TODO:user ? username?
export const apiGetAuthUser = async (user: string): Promise<ApiResponse> => {
	const response = await fetch(`${BASE_URL}/api/users/me`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: user
	});

	return await response.json();
}
import { User, ApiResponse } from './types';

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

export const apiRegisterUser = async (credentials: string): Promise<ApiResponse> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
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
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials
	});

	return await response.json();

}

export const apiLogoutUser = async (): Promise<ApiResponse> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	return await response.json();
}

export const apiGetAuthUser = async (): Promise<ApiResponse> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	return await response.json();
}
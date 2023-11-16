import { ApiResponseUser, ApiResponseProducts } from './types';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export const apiRegisterUser = async (credentials: string): Promise<ApiResponseUser> => {
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

export const apiLoginUser = async (credentials: string): Promise<ApiResponseUser> => {
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

export const apiGetAuthUser = async (username: string): Promise<ApiResponseUser> => {
	const response = await fetch(`${BASE_URL}/api/users/me`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: username
	});

	return await response.json();
}

export const apiGetProfileUser = async (username: string): Promise<ApiResponseUser> => {
	const response = await fetch(`${BASE_URL}/api/users/${username}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	return await response.json();
}

export const apiGetProducts = async (): Promise<ApiResponseProducts> => {
	const response = await fetch(`${BASE_URL}/api/products`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return await response.json();
}

export const apiGetPlatformProducts = async (platform: string): Promise<ApiResponseProducts> => {
	const response = await fetch(`${BASE_URL}/api/products/${platform}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	return await response.json();
}
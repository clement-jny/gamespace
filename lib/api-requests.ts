import { AuthUser, UserLoginResponse, UserResponse } from './types';

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000';

async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get('Content-Type') || '';
	const isJson = contentType.includes('application/json');
	const data = isJson ? await response.json() : await response.text();

	if (!response.ok) {
		if (isJson && data.errors !== null) {
			// throw new Error(JSON.stringify(data.errors));
		}

		throw new Error(data.message || response.statusText);
	}

	return data as T;
}

export const apiRegisterUser = async (credentials: string): Promise<AuthUser> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials,
	});

	return handleResponse<UserResponse>(response).then((data) => data.data.user);
}

export const apiLoginUser = async (credentials: string): Promise<string> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials,
	});

	return handleResponse<UserLoginResponse>(response).then((data) => data.token);
}

export const apiLogoutUser = async (): Promise<void> => {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return handleResponse<void>(response);
}

export const apiGetAuthUser = async (): Promise<AuthUser> => {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers,
	});

	return handleResponse<UserResponse>(response).then((data) => data.data.user);
}
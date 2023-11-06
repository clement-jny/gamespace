import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/helpers';

/* LOGOUT THE USER */
export async function GET(request: NextRequest) {
	const response = sendResponse(true, 'Successfully logged out', 200);

	await Promise.all([
		response.cookies.set({
			name: 'token',
			value: '',
			maxAge: -1
		}),
		response.cookies.set({
			name: 'logged-in',
			value: '',
			maxAge: -1
		})
	]);

	return response;
}
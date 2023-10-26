import { NextRequest, NextResponse } from 'next/server';
import { sendSuccessReponse } from '@/lib/helpers';

/* LOGOUT THE USER */
export async function GET(request: NextRequest) {
	// const response = sendResponse(true, 'Successfully logged out', 200);

	// await Promise.all([
	// 	response.cookies.set({
	// 		name: 'token',
	// 		value: '',
	// 		maxAge: -1
	// 	}),
	// 	response.cookies.set({
	// 		name: 'logged-in',
	// 		value: 'false',
	// 		maxAge: -1
	// 	})
	// ]);

	// return response;

	const response = new NextResponse(JSON.stringify({ status: 'success' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});

	await Promise.all([
		response.cookies.set({
			name: 'token',
			value: '',
			maxAge: -1,
		}),
		response.cookies.set({
			name: 'logged-in',
			value: '',
			maxAge: -1,
		}),
	]);

	return response;
}
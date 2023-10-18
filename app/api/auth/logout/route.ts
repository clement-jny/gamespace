import { NextRequest, NextResponse } from 'next/server';

/* LOGOUT THE USER */
export async function GET(request: NextRequest) {
	const response = NextResponse.json({ status: 'success' },
		{
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});

	await Promise.all([
		response.cookies.set({
			name: 'logged-in',
			value: 'false',
			maxAge: -1
		}),
		response.cookies.set({
			name: 'username',
			value: '',
			maxAge: -1
		})
	]);

	return response;
}
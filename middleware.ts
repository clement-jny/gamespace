import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/token';
import { sendSuccessReponse, sendErrorResponse } from './lib/helpers';

interface AuthenticatedRequest extends NextRequest {
	user: {
		id: string;
	};
}

let redirectToLogin = false;

export const middleware = async (request: NextRequest) => {
	let token: string | undefined;

	if (request.cookies.has('token')) {
		token = request.cookies.get('token')?.value;
	} else if (request.headers.get('Authorization')?.startsWith('Bearer ')) {
		token = request.headers.get('Authorization')?.substring(7);
	}

	if (request.nextUrl.pathname.startsWith('/login') && (!token || redirectToLogin)) {
		return;
	}

	// TOOD: change with /api/users/me
	if (!token && (request.nextUrl.pathname.startsWith('/api/users') || request.nextUrl.pathname.startsWith('/api/auth/logout'))) {
		return sendErrorResponse('You are not logged in. Please provide a token to gain access.', 401);
	}

	const response = NextResponse.next();

	try {
		if (token) {
			const { sub } = await verifyJWT<{ sub: string }>(token);
			response.headers.set('X-USER-ID', sub);
			(request as AuthenticatedRequest).user = { id: sub };
		}
	} catch (error) {
		redirectToLogin = true;
		if (request.nextUrl.pathname.startsWith('/api')) {
			return sendErrorResponse('Token is invalid or user doesn\'t exists', 401);
		}

		return NextResponse.redirect(
			new URL(`/login?${new URLSearchParams({ error: 'badauth' })}`, request.url)
		);
	}

	const authUser = (request as AuthenticatedRequest).user;

	if (!authUser) {
		return NextResponse.redirect(
			new URL(
				`/login?${new URLSearchParams({
					error: 'badauth',
					forceLogin: 'true',
				})}`,
				request.url
			)
		);
	}

	// TODO: change to URL('/account')
	if (request.url.includes('/login') && authUser) {
		return NextResponse.redirect(new URL('/profile', request.url));
	}

	return response;
}

// TODO: change to '/account'
export const config = {
	matcher: ['/profile', '/login', '/api/users/:path*', '/api/auth/logout'],
};

import { NextRequest, NextResponse } from 'next/server';
import { verifyJWT } from './lib/token';
import { sendResponse } from './lib/helpers';

interface AuthenticatedRequest extends NextRequest {
	user: {
		id: string;
	};
}

export const middleware = async (request: NextRequest) => {
	console.log('hey from middleware');


	const tokenFromCookie = request.cookies.get('token')?.value;
	const tokenFromHeader = request.headers.get('Authorization')?.replace('Bearer ', '');

	if (!tokenFromCookie && !tokenFromHeader) {
		if (request.nextUrl.pathname.startsWith('/login')) {
			return; // Allow access to login page without token
		}
		console.log(tokenFromCookie);


		return sendResponse(false, 'You are not logged in. Please provide a token to gain access (middle l.25).', 401);
	}

	const response = NextResponse.next();
	const token = tokenFromCookie || tokenFromHeader;

	try {
		if (token) {
			const { userId } = await verifyJWT<{ userId: string }>(token);
			response.headers.set('X-USER-ID', userId);
			(request as AuthenticatedRequest).user = { id: userId };
		}
	} catch (error) {
		if (request.nextUrl.pathname.startsWith('/api')) {
			return sendResponse(false, 'Token is invalid or user doesn\'t exist.', 401);
		}

		// Redirect to login page if token is invalid
		return NextResponse.redirect(`/login?error=badToken&returnUrl=${request.url}`);
	}

	if (request.nextUrl.pathname.startsWith('/login')) {
		// Redirect to dashboard if the user is already logged in
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return response;
};


// let redirectToLogin = false;

// export const middleware = async (request: NextRequest) => {
// 	let token: string | undefined;

// 	if (request.cookies.has('token')) {
// 		token = request.cookies.get('token')?.value;
// 	} else if (request.headers.get('Authorization')?.startsWith('Bearer ')) {
// 		token = request.headers.get('Authorization')?.substring(7);
// 	}

// 	if (request.nextUrl.pathname.startsWith('/login') && (!token || redirectToLogin)) {
// 		console.log('ici');

// 		return;
// 	}

// 	// TODO : change with /api/users/me
// 	if (!token && (request.nextUrl.pathname.startsWith('/api/users') || request.nextUrl.pathname.startsWith('/api/auth/logout'))) {
// 		return sendResponse('You are not logged in. Please provide a token to gain access. (middle l.28)', 401);
// 	}

// 	const response = NextResponse.next();

// 	try {
// 		if (token) {
// 			const { userId } = await verifyJWT<{ userId: string }>(token);
// 			response.headers.set('X-USER-ID', userId);
// 			(request as AuthenticatedRequest).user = { id: userId };
// 		}
// 	} catch (error) {
// 		redirectToLogin = true;
// 		if (request.nextUrl.pathname.startsWith('/api')) {
// 			return sendResponse('Token is invalid or user doesn\'t exists. (middle l.42)', 401);
// 		}



// 		// TODO : remove SearchParams and redirect to /login
// 		return NextResponse.redirect(
// 			new URL(`/login?${new URLSearchParams({ error: 'badToken' })}`, request.url)
// 		);
// 	}

// 	const authUser = (request as AuthenticatedRequest).user;

// 	if (!authUser) {
// 		return NextResponse.redirect(
// 			new URL(
// 				`/login?${new URLSearchParams({
// 					error: 'badauth',
// 					forceLogin: 'true',
// 				})}`,
// 				request.url
// 			)
// 		);
// 	}

// 	if (authUser && request.nextUrl.pathname.startsWith('/login')) {
// 		return NextResponse.redirect(new URL('/dashboard', request.url));
// 	}

// 	return response;
// }

export const config = {
	matcher: ['/dashboard', '/login', '/api/users/:path*', '/api/auth/logout'],
};

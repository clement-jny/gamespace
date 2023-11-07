// TODO delete this file

// import { NextResponse } from "next/server";

// import { NextRequest } from 'next/server';

// /* LOGOUT THE USER */
// export async function GET(request: NextRequest) {
//	const response = NextResponse.json({ success: true, message: 'Successfully logged out' }, { status: 200 });

// 	// TODO remove cookies ?
// 	await Promise.all([
// 		response.cookies.set({
// 			name: 'token',
// 			value: '',
// 			maxAge: -1
// 		}),
// 		response.cookies.set({
// 			name: 'logged-in',
// 			value: '',
// 			maxAge: -1
// 		})
// 	]);

// 	return response;
// }
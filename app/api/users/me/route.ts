import { NextRequest, NextResponse } from 'next/server';
import { sendSuccessReponse, sendErrorResponse } from '@/lib/helpers';
import { db } from '@/lib/prisma';
import { verifyJWT } from '@/lib/token';

export const GET = async (request: NextRequest) => {
	// let token: string | undefined;

	// if (request.cookies.has('token')) {
	// 	token = request.cookies.get('token')?.value;
	// }

	// try {
	// 	if (token) {
	// 		const { sub } = await verifyJWT<{ sub: string }>(token);

	// 		console.log(sub);


	// 		const user = await db.user.findUniqueOrThrow({
	// 			where: {
	// 				username: sub
	// 			}
	// 		});

	// 		return sendSuccessReponse('Successfully returned ME', 200, { user: { ...user, password: undefined } });
	// 	} else {
	// 		return sendErrorResponse('No Token', 401);
	// 	}
	// } catch (error) {
	// 	return sendErrorResponse('User doesn\'t exists', 401);
	// }

	const userId = request.headers.get("X-USER-ID");

	if (!userId) {
		return sendErrorResponse('You are not logged in, please provide token to gain access', 401);
	}

	const user = await db.user.findUnique({ where: { id: userId } });

	return NextResponse.json({
		status: 'success',
		data: { user: { ...user, password: undefined } },
	});
}
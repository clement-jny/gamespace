import { NextRequest, NextResponse } from 'next/server';
import { sendResponse } from '@/lib/helpers';
import { db } from '@/lib/prisma';
import { verifyJWT } from '@/lib/token';

export const GET = async (request: NextRequest) => {
	const token = request.cookies.get('token')?.value;

	try {
		if (token) {
			const { userId } = await verifyJWT<{ userId: string }>(token);

			console.log(userId);

			const user = await db.user.findUniqueOrThrow({
				where: {
					id: userId
				},
				include: {
					products: true,
					address: true
				}
			});

			// return sendResponse(true, 'Successfully returned ME', 200);
			return NextResponse.json({ success: true, message: 'Successfully returned ME', data: { user } });
		} else {
			return sendResponse(false, 'No Token', 401);
		}
	} catch (error) {
		return sendResponse(false, 'User doesn\'t exists', 401);
	}

	// const userId = request.headers.get("X-USER-ID");

	// if (!userId) {
	// 	return sendResponse(false, 'You are not logged in, please provide token to gain access', 401);
	// }

	// const user = await db.user.findUnique({ where: { id: userId } });

	// return sendResponse(true, 'Successfully returned ME', 200);
}
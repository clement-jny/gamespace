import { NextRequest } from 'next/server';
import { sendResponse } from '@/lib/helpers';
import { db } from '@/lib/prisma';
import { verifyJWT } from '@/lib/token';

export const GET = async (request: NextRequest) => {
	let token: string | undefined;

	if (request.cookies.has('token')) {
		token = request.cookies.get('token')?.value;
	}

	try {
		if (token) {
			const { sub } = await verifyJWT<{ sub: string }>(token);

			console.log(sub);


			const user = await db.user.findUniqueOrThrow({
				where: {
					username: sub
				}
			});

			return sendResponse(true, 'Successfully returned ME', 200, { user: { ...user, password: undefined } });
		} else {
			return sendResponse(false, 'No Token', 401);
		}
	} catch (error) {
		return sendResponse(false, 'User doesn\'t exists', 401);
	}
}
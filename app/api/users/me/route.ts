import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { sendErrorResponse, sendSuccessResponse } from '@/lib/helpers';

//TODO: include products and address
export const POST = async (request: NextRequest) => {
	try {
		const body = await request.json();
		const { username } = body;

		const user = await db.user.findUnique({
			where: {
				username
			},
			// include: {
			// 	products: true,
			// 	address: true
			// }
		});

		if (!user) {
			return sendErrorResponse('User doesn\'t exists', 400);
		}

		return sendSuccessResponse('User exists', 200, { user });
		// return sendSuccessResponse('User exists', 200, { user: { ...user, id: undefined, password: undefined } });
	} catch (error: unknown) {
		if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return sendErrorResponse(`Error: ${error.message}`, 500);
		} else {
			// Gérer les erreurs inattendues
			return sendErrorResponse('An unexpected error occurred', 500);
		}
	}
}

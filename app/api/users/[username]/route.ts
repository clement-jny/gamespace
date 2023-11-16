import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { sendErrorResponse, sendSuccessResponse } from '@/lib/helpers';

type RouteProps = {
	params: {
		username: string;
	};
}

export const GET = async (request: NextRequest, { params: { username } }: RouteProps) => {
	try {
		const user = await db.user.findUnique({
			where: {
				username
			},
			include: {
				products: {
					include: {
						images: true
					}
				}
			}
		});

		if (!user) {
			return sendErrorResponse('User doesn\'t exists, please retry !', 400);
		}

		return sendSuccessResponse('User exists', 200, { user: { ...user, id: undefined, password: undefined } });
	} catch (error) {
		if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return sendErrorResponse(`Error: ${error.message}`, 500);
		} else {
			// Gérer les erreurs inattendues
			return sendErrorResponse('An unexpected error occurred', 500);
		}
	}
}
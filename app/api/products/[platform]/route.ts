import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { sendErrorResponse, sendSuccessResponse } from '@/lib/helpers';
import { Platform } from '@prisma/client';

type RouteProps = {
	params: {
		platform: string;
	};
}

export const GET = async (request: NextRequest, { params: { platform } }: RouteProps) => {
	try {
		if (!(Object.values(Platform) as string[]).includes(platform.toUpperCase())) {
			return sendErrorResponse('Platform doesn\'t exists', 400);
		} else {
			const products = await db.product.findMany({
				where: {
					platform: platform.toUpperCase() as Platform
				},
				include: {
					images: true
				}
			});

			return sendSuccessResponse('Products exists', 200, { products });
		}
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
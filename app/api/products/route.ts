import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { sendErrorResponse, sendSuccessResponse } from '@/lib/helpers';

export const GET = async (request: NextRequest) => {
	try {
		const products = await db.product.findMany({
			take: 5,
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				images: true,
			}
		});

		return sendSuccessResponse('Products exists', 200, { products });
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
import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';
import { sendSuccessResponse, sendErrorResponse } from '@/lib/helpers';

export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as LoginUserInput;
		const { username, password } = LoginUserSchema.parse(body);

		const user = await db.user.findUnique({
			where: {
				username
			}
		});

		if (!user || !(await compare(password, user.password))) {
			return sendErrorResponse('Invalid username or password', 400);
		}

		return sendSuccessResponse('Successfully logged in', 200, { user });
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return sendErrorResponse('Validation failed', 400);
		} else if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return sendErrorResponse(`Error: ${error.message}`, 500);
		} else {
			// Gérer les erreurs inattendues
			return sendErrorResponse('An unexpected error occurred', 500);
		}
	}
}
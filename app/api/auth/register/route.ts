import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';
import { sendSuccessResponse, sendErrorResponse } from '@/lib/helpers';

export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as RegisterUserInput;
		const { username, password } = RegisterUserSchema.parse(body);

		const user = await db.user.findUnique({
			where: {
				username
			}
		});

		if (user) {
			return sendErrorResponse('User already exists', 409);
		}

		const hashedPassword = await hash(password, 12);

		await db.user.create({
			data: {
				username,
				password: hashedPassword
			}
		});

		return sendSuccessResponse('User created successfully', 201);
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
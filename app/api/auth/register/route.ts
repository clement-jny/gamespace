import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { sendResponse } from '@/lib/helpers';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

/* REGISTER THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as RegisterUserInput;
		const { username, email, password } = RegisterUserSchema.parse(body);

		const hashedPassword = await hash(password, 12);

		const user = await db.user.create({
			data: {
				username: username,
				email: email,
				password: hashedPassword
			}
		});

		return sendResponse(true, 'Successfully registered', 201);
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return sendResponse(false, 'Validation failed (register 1)', 400);
		} else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
			// Gérer l'erreur spécifique de doublon (email / username)
			return sendResponse(false, 'User with that email or username already exists (register 2)', 409);
		} else if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return sendResponse(false, error.message + ' (register 3)', 500);
		} else {
			// Gérer les erreurs inattendues
			return sendResponse(false, 'An unexpected error occurred (register 4)', 500);
		}
	}
}
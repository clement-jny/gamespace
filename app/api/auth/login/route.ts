import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { getEnvVariable, sendResponse } from '@/lib/helpers';
import { signJWT } from '@/lib/token';
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';

/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as LoginUserInput;
		const { email, password } = LoginUserSchema.parse(body);

		const user = await db.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user || !(await compare(password, user.password))) {
			return sendResponse(false, 'Invalid email or password (login 1)', 401);
		}

		const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN'); // -> string

		const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

		const token = await signJWT(
			{ userId: user.id },
			{ exp: `${JWT_EXPIRES_IN}m` }
		);

		const response = sendResponse(true, 'Successfully logged in', 200);

		await Promise.all([
			response.cookies.set({
				name: 'token',
				value: token,
				httpOnly: true,
				path: '/',
				secure: process.env.NODE_ENV !== 'development',
				maxAge: tokenMaxAge
			}),
			response.cookies.set({
				name: 'logged-in',
				value: 'true',
				maxAge: tokenMaxAge
			})
		]);

		return response;
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return sendResponse(false, 'Validation failed (login 2)', 400);
		} else if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return sendResponse(false, error.message + ' (login 3)', 500);
		} else {
			// Gérer les erreurs inattendues
			return sendResponse(false, 'An unexpected error occurred (login 4)', 500);
		}
	}
}
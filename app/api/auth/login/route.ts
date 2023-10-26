import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { getEnvVariable, sendSuccessReponse, sendErrorResponse } from '@/lib/helpers';
import { signJWT } from '@/lib/token';
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';

/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		// const { email, password }: User = await request.json();
		const body = (await request.json()) as LoginUserInput;
		const data = LoginUserSchema.parse(body);

		// const user = await db.user.findUnique({
		// 	where: {
		// 		email: email
		// 	}
		// });
		const user = await db.user.findUnique({
			where: { email: data.email },
		});

		// if (!user || !(await compare(password, user.password))) {
		// 	return sendResponse(false, 'Invalid email or password', 401);
		// }
		if (!user || !(await compare(data.password, user.password))) {
			return sendErrorResponse('Invalid email or password', 401);
		}


		// const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');
		// const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

		// const token = await signJWT(
		// 	{ sub: user.id },
		// 	{ exp: `${JWT_EXPIRES_IN}m` }
		// );

		// const response = sendResponse(true, 'Successfully logged in', 200);

		// await Promise.all([
		// 	response.cookies.set({
		// 		name: 'token',
		// 		value: token,
		// 		maxAge: tokenMaxAge
		// 	}),
		// 	response.cookies.set({
		// 		name: 'logged-in',
		// 		value: 'true',
		// 		maxAge: tokenMaxAge
		// 	})
		// ]);

		// return response;
		const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');

		const token = await signJWT(
			{ sub: user.id },
			{ exp: `${JWT_EXPIRES_IN}m` }
		);

		const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
		const cookieOptions = {
			name: 'token',
			value: token,
			httpOnly: true,
			path: '/',
			secure: process.env.NODE_ENV !== 'development',
			maxAge: tokenMaxAge,
		};

		const response = new NextResponse(
			JSON.stringify({
				status: 'success',
				token,
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		);

		await Promise.all([
			response.cookies.set(cookieOptions),
			response.cookies.set({
				name: 'logged-in',
				value: 'true',
				maxAge: tokenMaxAge,
			}),
		]);

		return response;
	} catch (error: any) {
		// if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// 	return sendErrorResponse('Error logging in', 500);
		// } else {
		// 	console.error(error)
		// }
		if (error instanceof ZodError) {
			return sendErrorResponse('failed validations', 400, error);
		}

		return sendErrorResponse(error.message, 500);
	}
}
import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { getEnvVariable, sendResponse } from '@/lib/helpers';
import { signJWT } from "@/lib/token";

/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password }: User = await request.json();

		const user = await db.user.findUnique({
			where: {
				email: email
			}
		});

		if (!user || !(await compare(password, user.password))) {
			return sendResponse(false, 'Invalid email or password', 401);
		}


		const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');
		const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;

		const token = await signJWT(
			{ sub: user.username },
			{ exp: `${JWT_EXPIRES_IN}m` }
		);

		const response = sendResponse(true, 'Successfully logged in', 200);

		await Promise.all([
			response.cookies.set({
				name: 'token',
				value: token,
				httpOnly: true,
				path: "/",
				maxAge: tokenMaxAge
			}),
			response.cookies.set({
				name: 'logged-in',
				value: 'true',
				maxAge: tokenMaxAge
			})
		]);

		return response;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return sendResponse(false, 'Error logging in', 500);
		} else {
			console.error(error)
		}
	}
}
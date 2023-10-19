import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcryptjs';

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
			return NextResponse.json({ success: false, error: 'Invalid email or password' },
				{
					status: 401,
					headers: { 'Content-Type': 'application/json' }
				});

			// return getErrorResponse(401, 'Invalid email or password');
		}

		const response = NextResponse.json({ success: true, user },
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});

		await Promise.all([
			response.cookies.set({
				name: 'logged-in',
				value: 'true',
				maxAge: 60 * 60 * 24 * 365,
			}),
			response.cookies.set({
				name: 'username',
				value: user.username,
				maxAge: 60 * 60 * 24 * 365,
			})
		]);

		return response;










		// const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");

		// const token = await signJWT(
		// 	{ sub: user.id.toString() },
		// 	{ exp: `${JWT_EXPIRES_IN}m` }
		// );

		// const response = NextResponse.json(
		// 	{
		// 		status: 'success',
		// 		token
		// 	},
		// 	{
		// 		status: 200,
		// 		headers: { 'Content-Type': 'application/json' }
		// 	}
		// );

		// const cookieMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
		// await Promise.all([
		// 	response.cookies.set({
		// 		name: 'token',
		// 		value: token,
		// 		httpOnly: true,
		// 		path: "/",
		// 		secure: process.env.NODE_ENV !== "development",
		// 		maxAge: cookieMaxAge
		// 	}),
		// 	response.cookies.set({
		// 		name: 'logged-in',
		// 		value: 'true',
		// 		maxAge: cookieMaxAge
		// 	})
		// ]);

		// return response;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ status: 'error', error: 'Error getting user' }, { status: 404 });
		} else {
			console.error(error)
		}
	}
}




// export async function POST(req: NextRequest) {
// 	try {





// 	} catch (error: any) {
// 		if (error instanceof ZodError) {
// 			return getErrorResponse(400, "failed validations", error);
// 		}

// 		return getErrorResponse(500, error.message);
// 	}
// }
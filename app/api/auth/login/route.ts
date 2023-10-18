import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../db/prisma';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcryptjs';

/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password }: User = await request.json();

		const user = await db.user.findUniqueOrThrow({
			where: {
				email: email,
				//password: password
			}
		});

		// const body = (await req.json()) as LoginUserInput;
		// const data = LoginUserSchema.parse(body);

		// const us = await db.user.findUnique({
		// 	where: { email: data.email },
		// });

		if (!user || !(await compare(password, user.password))) {
			//return getErrorResponse(401, "Invalid email or password");
			return NextResponse.json({ status: 'error', error: 'Invalid email or password' },
				{
					status: 401,
					headers: { 'Content-Type': 'application/json' }
				});
		}

		const response = NextResponse.json({ status: 'success', user },
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
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ status: 'error', error: 'Error getting user' }, { status: 404 });
		} else {
			console.error(error)
		}
	}
}
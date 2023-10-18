import { NextRequest, NextResponse } from 'next/server';
import { db } from '../db/prisma';
import { Prisma, User } from '@prisma/client';

/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password }: User = await request.json();

		const user = await db.user.findFirstOrThrow({
			where: {
				email: email,
				password: password
			}
		});

		const allCookiesRequest = request.cookies.getAll();
		console.log(allCookiesRequest)

		const response = NextResponse.json(user, { status: 200 });

		const allCookiesResponse = response.cookies.getAll();
		console.log(allCookiesResponse)

		response.cookies.set({ name: 'username', value: user.username })

		return response;
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ code: error.code, message: error.message, error: 'Error getting user' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}
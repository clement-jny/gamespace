import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { sendResponse } from '@/lib/helpers';

/* REGISTER THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { username, email, password }: User = await request.json();
		const hashedPassword = await hash(password, 12);

		await db.user.create({
			data: {
				username: username,
				email: email,
				password: hashedPassword
			}
		});

		return sendResponse(true, 'Successfully registered', 201);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return sendResponse(false, 'Error creating user', 500);
		} else {
			console.error(error)
		}
	}
}
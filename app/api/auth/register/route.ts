import { NextRequest } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { sendSuccessReponse, sendErrorResponse } from '@/lib/helpers';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';

/* REGISTER THE USER */
export const POST = async (request: NextRequest) => {
	try {
		// const { username, email, password }: User = await request.json();
		const body = (await request.json()) as RegisterUserInput;
		const data = RegisterUserSchema.parse(body);



		// const hashedPassword = await hash(password, 12);
		const hashedPassword = await hash(data.password, 12);



		// await db.user.create({
		// 	data: {
		// 		username: username,
		// 		email: email,
		// 		password: hashedPassword
		// 	}
		// });
		const user = await db.user.create({
			data: {
				username: data.username,
				email: data.email,
				password: hashedPassword
			}
		});



		// return new NextResponse(
		// 	JSON.stringify({
		// 		status: 'success',
		// 		data: { user: { ...user, password: undefined } },
		// 	}),
		// 	{
		// 		status: 201,
		// 		headers: { 'Content-Type': 'application/json' },
		// 	}
		// );
		return sendSuccessReponse('Successfully registered', 201, { user: { ...user, password: undefined } });
	} catch (error: any) {
		// if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// 	return sendResponse(false, 'Error creating user', 500);
		// } else {
		// 	console.error(error)
		// }

		if (error instanceof ZodError) {
			return sendErrorResponse('Failed validations', 400, error);
		}

		if (error.code === 'P2002') {
			return sendErrorResponse('User with that email already exists', 409);
		}

		return sendErrorResponse(error.message, 500);
	}
}
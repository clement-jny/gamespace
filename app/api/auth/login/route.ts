import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';

// TODO remove cookies ?
/* LOG THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as LoginUserInput;
		const { username, password } = LoginUserSchema.parse(body);

		const user = await db.user.findUnique({
			where: {
				username
			}
		});

		if (!user || !(await compare(password, user.password))) {
			return NextResponse.json({ success: false, message: 'Invalid username or password (login 1)' }, { status: 401 });
		}

		return NextResponse.json({ success: true, message: 'Successfully logged in', user }, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return NextResponse.json({ success: false, message: 'Validation failed (login 2)' }, { status: 400 });
		} else if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return NextResponse.json({ success: false, message: error.message + ' (login 3)' }, { status: 500 });
		} else {
			// Gérer les erreurs inattendues
			return NextResponse.json({ success: false, message: 'An unexpected error occurred (login 4)' }, { status: 500 });
		}
	}
}
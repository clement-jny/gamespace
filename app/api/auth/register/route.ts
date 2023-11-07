import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { ZodError } from 'zod';

export const POST = async (request: NextRequest) => {
	try {
		const body = (await request.json()) as RegisterUserInput;
		const { username, password } = RegisterUserSchema.parse(body);

		const user = await db.user.findUnique({
			where: {
				username
			}
		});

		if (user) {
			return NextResponse.json({ success: false, message: 'User already exists (register 0)' }, { status: 409 });
		}

		const hashedPassword = await hash(password, 12);

		const newUser = await db.user.create({
			data: {
				username,
				password: hashedPassword
			}
		});

		return NextResponse.json({ newUser, message: 'User created successfully' }, { status: 201 });
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			return NextResponse.json({ success: false, message: 'Validation failed (register 2)' }, { status: 400 });
		} else if (error instanceof Error) {
			// Gérer les autres erreurs génériques
			return NextResponse.json({ success: false, message: error.message + ' (register 3)' }, { status: 500 });
		} else {
			// Gérer les erreurs inattendues
			return NextResponse.json({ success: false, message: 'An unexpected error occurred (register 4)' }, { status: 500 });
		}
	}
}
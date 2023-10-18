import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../db/prisma';
import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs'

/* REGISTER THE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password, username, lastname, firstname }: User = await request.json();
		const hashedPassword = await hash(password, 12);

		const user = await db.user.create({
			data: {
				email: email,
				password: hashedPassword,
				username: username,
				lastname: lastname,
				firstname: firstname
			}
		});

		return NextResponse.json({ status: 'success', user },
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ status: 'error', error: 'Error creating user' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}
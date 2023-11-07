import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

//TODO: refactor

/* GET ALL USERS */
export const GET = async (request: NextRequest) => {
	try {
		const users = await db.user.findMany();

		if (users.length !== 0) {
			return NextResponse.json(users, { status: 200 });
		} else {
			return NextResponse.json({ error: 'No users found' }, { status: 404 });
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ code: error.code, message: error.message, error: 'Error getting users' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}

/* INSERT ONE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password, username }: User = await request.json();

		const user = await db.user.create({
			data: {
				email: email,
				password: password,
				username: username
			}
		});

		return NextResponse.json(user, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ code: error.code, message: error.message, error: 'Error creating user' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}
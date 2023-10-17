import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


/* GET ALL USERS */
export const GET = async (request: NextRequest) => {
	try {
		const users = await prisma.user.findMany();

		if (users.length !== 0) {
			return NextResponse.json(users, { status: 200 });
		} else {
			return NextResponse.json({ error: 'No users found' }, { status: 404 });
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(error.code, error.message)
			return NextResponse.json({ error: 'Error getting users' }, { status: 500 })
		} else {
			console.error(error)
		}
	}
}

/* INSERT ONE USER */
export const POST = async (request: NextRequest) => {
	try {
		const { email, password, username, lastname, firstname } = await request.json();
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: password,
				username: username,
				lastname: lastname,
				firstname: firstname
			}
		});

		return Response.json(newUser, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.log(error.code, error.message)
			return Response.json({ error: 'Error creating user' }, { status: 500 })
		} else {
			console.error(error)
		}
	}
}


// (async () => {

// })()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 		console.log('disconnected');
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	})
import { NextRequest, NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type RouteProps = {
	params: {
		username: string;
	};
}

/* GET ONE USER */
export const GET = async (request: NextRequest, { params }: RouteProps) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username: params.username
		}
	});

	return NextResponse.json({ 'GET': user }, { status: 200 });
	// try {
	// 	const users = await prisma.user.findMany();

	// 	if (users.length !== 0) {
	// 		return NextResponse.json(users, { status: 200 });
	// 	} else {
	// 		return NextResponse.json({ error: 'No users found' }, { status: 404 });
	// 	}
	// } catch (error) {
	// 	if (error instanceof Prisma.PrismaClientKnownRequestError) {
	// 		console.error(error.code, error.message)
	// 		return NextResponse.json({ error: 'Error getting users' }, { status: 500 })
	// 	} else {
	// 		console.error(error)
	// 	}
	// }
}

/* UPDATE ONE USER */
export const PUT = async (request: NextRequest, { params }: RouteProps) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username: params.username
		}
	});

	return NextResponse.json({ 'PUT': user }, { status: 200 });
}
export const PATCH = async (request: NextRequest, { params }: RouteProps) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username: params.username
		}
	});

	return NextResponse.json({ 'PATCH': user }, { status: 200 });
}

/* DELETE ONE USER */
export const DELETE = async (request: NextRequest, { params }: RouteProps) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			username: params.username
		}
	});

	return NextResponse.json({ 'DELETE': user }, { status: 200 });
}
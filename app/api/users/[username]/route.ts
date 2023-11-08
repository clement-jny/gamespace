// import { NextRequest, NextResponse } from 'next/server';
// import { db } from '../../db/prisma';
// import { Prisma, User } from '@prisma/client';

// //TODO: refactor

// type RouteProps = {
// 	params: {
// 		username: string;
// 	};
// }

// /* GET ONE USER BY IT'S USERNAME */
// export const GET = async (request: NextRequest, { params }: RouteProps) => {
// 	try {
// 		const user = await db.user.findUniqueOrThrow({
// 			where: {
// 				username: params.username
// 			},
// 			include: {
// 				products: true
// 			}
// 		});

// 		return NextResponse.json(user, { status: 200 });
// 	} catch (error) {
// 		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
// 			return NextResponse.json({ code: error.code, message: error.message, error: "Record to get does not exist" }, { status: 404 });
// 		} else {
// 			console.error(error);
// 		}
// 	}
// }

// /* UPDATE ONE USER BY IT'S USERNAME */
// export const PUT = async (request: NextRequest, { params }: RouteProps) => {
// 	try {
// 		const { email, password, username, lastname, firstname }: User = await request.json();

// 		const user = await db.user.update({
// 			where: {
// 				username: params.username
// 			},
// 			data: {
// 				email: email,
// 				password: password,
// 				username: username,
// 				lastname: lastname,
// 				firstname: firstname
// 			}
// 		});

// 		return NextResponse.json(user, { status: 200 });
// 	} catch (error) {
// 		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
// 			return NextResponse.json({ code: error.code, message: error.message, error: "Record to update does not exist" }, { status: 404 });
// 		} else {
// 			console.error(error);
// 		}
// 	}
// }

// /* DELETE ONE USER BY IT'S USERNAME */
// export const DELETE = async (request: NextRequest, { params }: RouteProps) => {
// 	try {
// 		const user = await db.user.delete({
// 			where: {
// 				username: params.username
// 			}
// 		});

// 		return NextResponse.json(user, { status: 200 });
// 	} catch (error) {
// 		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
// 			return NextResponse.json({ code: error.code, message: error.message, error: "Record to delete does not exist" }, { status: 404 });
// 		} else {
// 			console.error(error);
// 		}
// 	}
// }
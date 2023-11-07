import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../db/prisma';
import { Prisma, Product } from '@prisma/client';

//TODO: refactor

type RouteProps = {
	params: {
		id: number;
	};
}

/* GET ONE PRODUCT BY IT'S ID */
export const GET = async (request: NextRequest, { params }: RouteProps) => {
	try {
		const product = await db.product.findUniqueOrThrow({
			where: {
				id: Number(params.id)
			}
		});

		return NextResponse.json(product, { status: 200 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
			return NextResponse.json({ code: error.code, message: error.message, error: "Record to get does not exist" }, { status: 404 });
		} else {
			console.error(error);
		}
	}
}

/* UPDATE ONE PRODUCT BY IT'S ID */
export const PUT = async (request: NextRequest, { params }: RouteProps) => {
	try {
		const { title, description, price, createdAt, platform, productCondition }: Product = await request.json();

		const product = await db.product.update({
			where: {
				id: Number(params.id)
			},
			data: {
				title: title,
				description: description,
				price: price,
				createdAt: createdAt,
				platform: platform,
				productCondition: productCondition,
			}
		});

		return NextResponse.json(product, { status: 200 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
			return NextResponse.json({ code: error.code, message: error.message, error: "Record to update does not exist" }, { status: 404 });
		} else {
			console.error(error);
		}
	}
}

/* DELETE ONE USER BY IT'S USERNAME */
export const DELETE = async (request: NextRequest, { params }: RouteProps) => {
	try {
		const product = await db.product.delete({
			where: {
				id: Number(params.id)
			}
		});

		return NextResponse.json(product, { status: 200 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
			return NextResponse.json({ code: error.code, message: error.message, error: "Record to delete does not exist" }, { status: 404 });
		} else {
			console.error(error);
		}
	}
}
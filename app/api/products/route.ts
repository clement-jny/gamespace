import { NextRequest, NextResponse } from 'next/server';
import { db } from '../db/prisma';
import { Prisma, Product } from '@prisma/client';

//TODO: redo this file

/* GET ALL PRODUCTS */
export const GET = async (request: NextRequest) => {
	try {
		const products = await db.product.findMany();

		if (products.length !== 0) {
			return NextResponse.json(products, { status: 200 });
		} else {
			return NextResponse.json({ error: 'No products found' }, { status: 404 });
		}
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ code: error.code, message: error.message, error: 'Error getting products' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}

/* INSERT ONE PRODUCT */
export const POST = async (request: NextRequest) => {
	try {
		const { title, description, price, createdAt, platform, productCondition }: Product = await request.json();

		const product = await db.product.create({
			data: {
				title: title,
				description: description,
				price: price,
				createdAt: createdAt,
				platform: platform,
				productCondition: productCondition,
				user: {
					connect: {
						username: 'admin'
					}
				}
			}
		});

		return NextResponse.json(product, { status: 201 });
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json({ code: error.code, message: error.message, error: 'Error creating product' }, { status: 500 });
		} else {
			console.error(error)
		}
	}
}
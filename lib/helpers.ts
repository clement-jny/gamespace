import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type EnvVariableKey = 'JWT_SECRET_KEY' | 'JWT_EXPIRES_IN' | 'DATABASE_URL';

export const getEnvVariable = (key: EnvVariableKey): string => {
	const value = process.env[key];

	if (!value || value.length === 0) {
		console.error(`The environment variable ${key} is not set.`);
		throw new Error(`The environment variable ${key} is not set.`);
	}

	return value;
}

export const sendSuccessReponse = (message: string, status: number, data?: {}) => {
	return NextResponse.json({ success: true, message, data },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		});
}
export const sendErrorResponse = (message: string, status: number, errors?: ZodError) => {
	return NextResponse.json({ success: false, message, errors },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		});
}
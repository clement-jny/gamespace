import { NextResponse } from 'next/server';

type EnvVariableKey = 'JWT_SECRET_KEY' | 'JWT_EXPIRES_IN';

export const getEnvVariable = (key: EnvVariableKey): string => {
	const value = process.env[key];

	if (!value || value.length === 0) {
		console.error(`The environment variable ${key} is not set.`);
		throw new Error(`The environment variable ${key} is not set.`);
	}

	return value;
}

export const sendResponse = (success: boolean, message: string, status: number, data?: {}) => {
	return NextResponse.json({ success, message, data },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		});
}
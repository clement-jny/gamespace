import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { toast } from 'react-hot-toast';

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

export const handleApiError = (error: Error): void => {
	try {
		let errorData;
		try {
			errorData = JSON.parse(error.message);
		} catch (parseError) {
			// Treat error.message as a plain error message
			// console.log('Error message:', error.message);
			toast.error(error.message);
			return;
		}

		if (
			typeof errorData === 'object' &&
			errorData !== null &&
			'fieldErrors' in errorData
		) {
			const fieldErrors = errorData.fieldErrors as Record<string, string[]>;
			Object.keys(fieldErrors).forEach((fieldName) => {
				const validationMessages = fieldErrors[fieldName];
				if (validationMessages.length > 0) {
					const firstValidationMessage = validationMessages[0];
					toast.error(firstValidationMessage);
					// console.log(
					//   `Validation error for ${fieldName}:`,
					//   firstValidationMessage
					// );
				}
			});
		}
	} catch (error: any) {
		// console.log('Original error message:', error);
		toast.error(error);
	}
}

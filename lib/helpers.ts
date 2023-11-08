import { NextResponse } from 'next/server';

export const sendSuccessResponse = (message: string, status: number, data?: {} | undefined) => {
	return NextResponse.json({ success: true, message, data },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		});
}

export const sendErrorResponse = (message: string, status: number) => {
	return NextResponse.json({ success: false, message },
		{
			status,
			headers: { 'Content-Type': 'application/json' }
		});
}
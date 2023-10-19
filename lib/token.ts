import { getEnvVariable } from './helpers';
import { SignJWT, jwtVerify } from 'jose';

export const signJWT = async (payload: { sub: string }, options: { exp: string }) => {
	try {
		const secret = new TextEncoder().encode(getEnvVariable('JWT_SECRET_KEY'));

		return new SignJWT(payload)
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(options.exp)
			.setIssuedAt()
			.setSubject(payload.sub)
			.sign(secret);
	} catch (error) {
		throw error;
	}
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
	try {
		return (
			await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY))
		).payload as T;
	} catch (error) {
		console.log(error);
		throw new Error('Your token has expired.');
	}
};

export async function verifyJwtToken(token: string) {
	try {
		const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
		return payload;
	} catch (error) {
		return null;
	}
}
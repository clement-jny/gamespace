import { getEnvVariable } from './helpers';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

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


// export async function sign(payload: Token, secret: string): Promise<string> {
// 	const iat = Math.floor(Date.now() / 1000);
// 	const exp = iat + 60 * 60; // one hour

// 	return new SignJWT({ ...payload })
// 		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
// 		.setExpirationTime(exp)
// 		.setIssuedAt(iat)
// 		.setNotBefore(iat)
// 		.sign(new TextEncoder().encode(secret));
// }

// export async function verify(token: string, secret: string): Promise<Token> {
// 	const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
// 	// run some checks on the returned payload, perhaps you expect some specific values

// 	// if its all good, return it, or perhaps just return a boolean
// 	return payload;
// }
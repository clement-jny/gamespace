import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { apiLoginUser } from '../apiRequests';

async function getData(credentials: string) {
	const response = await fetch(`${process.env.BASE_URL}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: credentials
	});

	if (!response.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return response.json()
}

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	},
	providers: [
		CredentialsProvider({
			credentials: {
				username: {},
				password: {}
			},
			async authorize(credentials, req) {
				const data = await getData(JSON.stringify(credentials));
				// const { success, data } = await apiLoginUser(JSON.stringify(credentials));


				if (!data.success || !data.data) {
					return null;
				}

				return data.data.user;
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				return {
					...token,
					username: user.username
				}
			}

			return token;
		},
		session: async ({ session, token }) => {
			return {
				...session,
				user: {
					...session.user,
					username: token.username
				}
			};
		}
	}
};
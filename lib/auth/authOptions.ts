import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiLoginUser } from '../apiRequests';

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
				const { success, data } = await apiLoginUser(JSON.stringify(credentials));

				if (!success || !data) {
					return null;
				}

				return data.user;
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
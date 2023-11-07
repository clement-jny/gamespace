import { db } from '../prisma';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginUserInput, LoginUserSchema } from '../validations/user.schema';
import { apiRegisterUser } from '../apiRequests';

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
				// const data = await apiRegisterUser(JSON.stringify(credentials));

				const response = await fetch('http://localhost:3000/api/auth/login', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(credentials)
				});

				const data = await response.json();

				if (!data || !data.user) {
					return null;
				}

				return data.user;
			}
		})
	],
	callbacks: {
		jwt: async ({ token, user, session }) => {
			if (user) {
				return {
					...token,
					id: user.id
				}
			}

			return token;
		},
		session: async ({ session, token, user }) => {
			return {
				...session,
				user: {
					...session.user,
					id: token.id
				}
			};
		}
	}
};
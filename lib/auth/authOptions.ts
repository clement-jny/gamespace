import { db } from '../prisma';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LoginUserInput, LoginUserSchema } from '../validations/user.schema';
import { apiLoginUser, apiRegisterUser } from '../apiRequests';
import { ApiResponse } from '../types';

//TODO: remove unused imports
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
				const { success, data, message } = await apiLoginUser(JSON.stringify(credentials));

				//TODO: verify user

				// console.log(success, data, message);


				// if (!success || !data) {
				// 	return null;
				// }

				// return data.user;



				return data?.user || null;

			}
		})
	],
	callbacks: {
		jwt: async ({ token, user, session }) => {
			if (user) {
				return {
					...token,
					username: user.username
				}
			}

			return token;
		},
		session: async ({ session, token, user }) => {
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
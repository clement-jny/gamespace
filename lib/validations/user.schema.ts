import { z } from 'zod';

export const RegisterUserSchema = z
	.object({
		username: z
			.string({ required_error: 'Username is required' }),
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email is invalid' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(3, { message: 'Password must be at least 3 characters' }),
		passwordConfirm: z
			.string({ required_error: 'Confirm your password' })
			.min(3, { message: 'Password must be at least 3 characters' })
	})
	.refine((data) => data.password === data.passwordConfirm,
		{
			path: ['passwordConfirm'],
			message: 'Passwords do not match',
		});

export const LoginUserSchema = z
	.object({
		email: z
			.string({ required_error: 'Email is required' })
			.email({ message: 'Email is invalid' }),
		password: z
			.string({ required_error: 'Password is required' })
			.min(3, { message: 'Password must be at least 3 characters' })
	});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
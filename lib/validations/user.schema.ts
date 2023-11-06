import { z } from 'zod';

export const RegisterUserSchema = z
	.object({
		username: z.string().min(1, { message: 'Username is required' }),
		email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
		password: z.string().min(1, { message: 'Password is required' }).min(3, { message: 'Password must be at least 3 characters' }),
		passwordConfirm: z.string().min(1, { message: 'Password confirmation is required' }).min(3, { message: 'Password must be at least 3 characters' })
	})
	.refine((data) => data.password === data.passwordConfirm,
		{
			path: ['passwordConfirm'],
			message: 'Passwords do not match',
		}
	);

export const LoginUserSchema = z
	.object({
		email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' }),
		password: z.string().min(1, { message: 'Password is required' }).min(3, { message: 'Password must be at least 3 characters' })
	});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
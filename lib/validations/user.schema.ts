import { z } from 'zod';

export const RegisterUserSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(1, { message: 'Username is required' }),

	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email is invalid' }),

	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
		.min(8, { message: 'Password must be at least 8 characters' })
		.max(32, { message: 'Password must be less than 32 characters' }),

	passwordConfirm: z
		.string({ required_error: 'Confirm your password' })
		.min(1, { message: 'Confirm your password' })
})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords do not match'
	});


export const LoginUserSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email is invalid' }),

	password: z
		.string({ required_error: 'Password is required' })
		.min(1, { message: 'Password is required' })
});

export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
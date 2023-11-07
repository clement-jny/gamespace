'use client';

import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/FormInput';
import Link from 'next/link';
import { LoadingButton } from '@/components/LoadingButton';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
	const methods = useForm<LoginUserInput>({
		resolver: zodResolver(LoginUserSchema),
	});

	const { handleSubmit } = methods;

	const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
		await signIn('credentials', {
			username: values.username,
			password: values.password,
			callbackUrl: '/',
		});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmitHandler)} className='max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5'>
				<FormInput label='Username' name='username' />
				<FormInput label='Password' name='password' type='password' />

				<div className='form-control w-full'>
					{/* <LoadingButton loading={store.requestLoading}>Login</LoadingButton> */}
					<button type='submit' className='btn btn-primary'>Login</button>

					<p className='mt-4'>Need an account ?
						<Link href='/register' className='ml-2 text-primary hover:underline'>Register</Link>
					</p>
				</div>
			</form>
		</FormProvider>
	)
}
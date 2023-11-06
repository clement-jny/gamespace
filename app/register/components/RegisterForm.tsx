// /* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { apiRegisterUser } from '@/lib/api-requests';
import { FormInput } from '@/components/FormInput';
import { LoadingButton } from '@/components/LoadingButton';
import useStore from '@/store';
// import { handleApiError } from '@/lib/helpers';

export const RegisterForm = () => {
	const store = useStore();
	const router = useRouter();

	const methods = useForm<RegisterUserInput>({
		resolver: zodResolver(RegisterUserSchema),
	});

	const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

	useEffect(() => {
		if (isSubmitSuccessful) {
			// reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	const onSubmitHandler: SubmitHandler<RegisterUserInput> = async (values) => {
		const data = await apiRegisterUser(JSON.stringify(values));

		if (data.success) {
			toast.success(data.message);
			// router.push('/login');
		} else {
			toast.error(data.message);
		}

		// store.setRequestLoading(true);
		// try {
		// -- api call
		// store.setAuthUser(user);
		// return router.push('/login');
		// } catch (error: any) {
		// if (error instanceof Error) {
		// handleApiError(error);
		// } else {
		// toast.error(error.message);
		// console.log('Error message:', error.message);
		// }
		// } finally {
		// store.setRequestLoading(false);
		// }
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmitHandler)} className='max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5'>
				<FormInput label='Username' name='username' />
				<FormInput label='Email' name='email' type='email' />
				<FormInput label='Password' name='password' type='password' />
				<FormInput label='Confirm Password' name='passwordConfirm' type='password' />

				<div className='form-control w-full'>
					<LoadingButton loading={store.requestLoading}>Register</LoadingButton>

					<p className='mt-4'>Already have an account ?
						<Link href='/login' className='ml-2 text-primary hover:underline'>Login</Link>
					</p>
				</div>
			</form>
		</FormProvider>
	)
}
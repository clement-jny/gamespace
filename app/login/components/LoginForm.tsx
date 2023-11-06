// /* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { LoginUserInput, LoginUserSchema } from '@/lib/validations/user.schema';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { apiLoginUser } from '@/lib/api-requests';
import { FormInput } from '@/components/FormInput';
import Link from 'next/link';
import { LoadingButton } from '@/components/LoadingButton';
import useStore from '@/store';
// import { handleApiError } from '@/lib/helpers';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
	const store = useStore();
	const router = useRouter();

	const methods = useForm<LoginUserInput>({
		resolver: zodResolver(LoginUserSchema),
	});

	const { reset, handleSubmit, formState: { isSubmitSuccessful } } = methods;

	useEffect(() => {
		if (isSubmitSuccessful) {
			// reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	useEffect(() => {
		store.reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
		const data = await apiLoginUser(JSON.stringify(values));

		if (data.success) {
			toast.success(data.message);
			// router.push('/');
		} else {
			toast.error(data.message);
		}

		// store.setRequestLoading(true);
		// try {
		// -- api call
		// } catch (error: any) {
		// 	console.log(error);
		// 	if (error instanceof Error) {
		// 		handleApiError(error);
		// 	} else {
		// 		toast.error(error.message);
		// 		console.log('Error message:', error.message);
		// 	}
		// } finally {
		// 	store.setRequestLoading(false);
		// }
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmitHandler)} className='max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5'>
				<FormInput label='Email' name='email' type='email' />
				<FormInput label='Password' name='password' type='password' />

				<div className='form-control w-full'>
					<LoadingButton loading={store.requestLoading}>Login</LoadingButton>

					<p className='mt-4'>Need an account ?
						<Link href='/register' className='ml-2 text-primary hover:underline'>Register</Link>
					</p>
				</div>
			</form>
		</FormProvider>
	)
}
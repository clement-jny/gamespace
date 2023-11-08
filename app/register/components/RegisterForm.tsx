'use client';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '@/components/FormInput';
import { apiRegisterUser } from '@/lib/apiRequests';

export const RegisterForm = () => {
	const router = useRouter();

	const methods = useForm<RegisterUserInput>({
		resolver: zodResolver(RegisterUserSchema),
	});

	const { handleSubmit } = methods;

	const onSubmitHandler: SubmitHandler<RegisterUserInput> = async (values) => {
		const { success, message } = await apiRegisterUser(JSON.stringify(values));

		if (success) {
			toast.success(message);

			router.push('/login');
		} else {
			toast.error(message);
		}
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmitHandler)} className='max-w-md w-full mx-auto overflow-hidden shadow-lg rounded-2xl p-8 space-y-5'>
				<FormInput label='Username' name='username' />
				<FormInput label='Password' name='password' type='password' />
				<FormInput label='Confirm Password' name='passwordConfirm' type='password' />

				<div className='form-control w-full'>
					<button type='submit' className='btn btn-primary'>Register</button>

					<p className='mt-4'>Already have an account ?
						<Link href='/login' className='ml-2 text-primary hover:underline'>Login</Link>
					</p>
				</div>
			</form>
		</FormProvider>
	)
}
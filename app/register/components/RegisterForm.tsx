// /* eslint-disable react/no-unescaped-entities */
// 'use client';

// import { useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export const RegisterForm = () => {
// 	const router = useRouter();


// 	const [username, setUsername] = useState('aa');
// 	const [email, setEmail] = useState('aa@aa.fr');
// 	const [password, setPassword] = useState('aaaaaaaa');
// 	const [passwordConfirm, setPasswordConfirm] = useState('aaaaaaaa');

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		fetch('http://localhost:3000/api/auth/register', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			body: JSON.stringify({ username, email, password })
// 		})
// 			.then(res => res.json())
// 			.then(data => {
// 				console.log(data);
// 				if (data.success) {
// 					toast.success(data.message);
// 					router.push('/login');

// 					//console.log('Register ok!');
// 				} else {
// 					toast.error(data.message);

// 					//console.log('Register failed!');
// 				}
// 			})
// 			.catch(err => console.log(err));

// 		//console.log('Submitted!');
// 	}

// 	return (
// 		<form onSubmit={handleSubmit} className='space-y-6'>

// 			<div className='form-control w-full'>
// 				<label className='label font-bold'>
// 					<span className='label-text'>Username</span>
// 				</label>
// 				<input type='text' placeholder='Type here' className='input input-bordered w-full' value={username} onChange={(e) => setUsername(e.target.value)} />
// 			</div>

// 			<div className='form-control w-full'>
// 				<label className='label font-bold'>
// 					<span className='label-text'>Email</span>
// 				</label>
// 				<input type='email' placeholder='Type here' className='input input-bordered w-full' value={email} onChange={(e) => setEmail(e.target.value)} />
// 			</div>

// 			<div className='form-control w-full'>
// 				<label className='label font-bold'>
// 					<span className='label-text'>Password</span>
// 				</label>
// 				<input type='password' placeholder='Type here' className='input input-bordered w-full' value={password} onChange={(e) => setPassword(e.target.value)} />
// 			</div>

// 			<div className='form-control w-full'>
// 				<label className='label font-bold'>
// 					<span className='label-text'>Confirm password</span>
// 				</label>
// 				<input type='password' placeholder='Type here' className='input input-bordered w-full' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
// 			</div>

// 			<div className='form-control w-full'>
// 				<button type='submit' className='btn btn-block btn-primary'>Submit</button>

// 				<p className='mt-4'>Already have an account ?
// 					<Link href='/login' className='ml-2 text-primary hover:underline'>Login</Link>
// 				</p>
// 			</div>
// 		</form>
// 	)
// }


'use client';

import { RegisterUserInput, RegisterUserSchema } from '@/lib/validations/user.schema';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { apiRegisterUser } from '@/lib/api-requests';
import { FormInput } from '@/components/FormInput';
import Link from 'next/link';
import { LoadingButton } from '@/components/LoadingButton';
import useStore from '@/store';
import { handleApiError } from '@/lib/helpers';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
	const store = useStore();
	const router = useRouter();

	const methods = useForm<RegisterUserInput>({
		resolver: zodResolver(RegisterUserSchema),
	});

	const {
		reset,
		handleSubmit,
		formState: { isSubmitSuccessful },
	} = methods;

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSubmitSuccessful]);

	async function RegisterUserFunction(credentials: RegisterUserInput) {
		store.setRequestLoading(true);
		try {
			const user = await apiRegisterUser(JSON.stringify(credentials));
			store.setAuthUser(user);
			return router.push('/login');
		} catch (error: any) {
			if (error instanceof Error) {
				handleApiError(error);
			} else {
				toast.error(error.message);
				console.log('Error message:', error.message);
			}
		} finally {
			store.setRequestLoading(false);
		}
	}

	const onSubmitHandler: SubmitHandler<RegisterUserInput> = (values) => {
		RegisterUserFunction(values);
	};

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={handleSubmit(onSubmitHandler)}
				className='max-w-md w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-8 space-y-5'
			>
				<FormInput label='Full Name' name='name' />
				<FormInput label='Email' name='email' type='email' />
				<FormInput label='Password' name='password' type='password' />
				<FormInput
					label='Confirm Password'
					name='passwordConfirm'
					type='password'
				/>
				<span className='block'>
					Already have an account?{' '}
					<Link href='/login' className='text-ct-blue-600'>
						Login Here
					</Link>
				</span>
				<LoadingButton
					loading={store.requestLoading}
					textColor='text-ct-blue-600'
				>
					Register
				</LoadingButton>
			</form>
		</FormProvider>
	);
}

/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const RegisterForm = () => {
	const router = useRouter();


	const [username, setUsername] = useState('aa');
	const [email, setEmail] = useState('aa@aa.fr');
	const [password, setPassword] = useState('aaaaaaaa');
	const [passwordConfirm, setPasswordConfirm] = useState('aaaaaaaa');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		fetch('http://localhost:3000/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, email, password })
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					toast.success(data.message);
					router.push("/login");

					//console.log('Register ok!');
				} else {
					toast.error(data.message);

					//console.log('Register failed!');
				}
			})
			.catch(err => console.log(err));

		//console.log('Submitted!');
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-6'>

			<div className='form-control w-full'>
				<label className='label font-bold'>
					<span className='label-text'>Username</span>
				</label>
				<input type='text' placeholder='Type here' className='input input-bordered w-full' value={username} onChange={(e) => setUsername(e.target.value)} />
			</div>

			<div className='form-control w-full'>
				<label className='label font-bold'>
					<span className='label-text'>Email</span>
				</label>
				<input type='email' placeholder='Type here' className='input input-bordered w-full' value={email} onChange={(e) => setEmail(e.target.value)} />
			</div>

			<div className='form-control w-full'>
				<label className='label font-bold'>
					<span className='label-text'>Password</span>
				</label>
				<input type='password' placeholder='Type here' className='input input-bordered w-full' value={password} onChange={(e) => setPassword(e.target.value)} />
			</div>

			<div className='form-control w-full'>
				<label className='label font-bold'>
					<span className='label-text'>Confirm password</span>
				</label>
				<input type='password' placeholder='Type here' className='input input-bordered w-full' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
			</div>

			<div className='form-control w-full'>
				<button type='submit' className='btn btn-block btn-primary'>Submit</button>

				<p className='mt-4'>Already have an account ?
					<Link href='/login' className='ml-2 text-primary hover:underline'>Login</Link>
				</p>
			</div>
		</form>
	)
}

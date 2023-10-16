import React from 'react';
import LoginForm from './loginForm';
import SignupForm from './signupForm';

export default function Home() {
	return (
		<main>
			<LoginForm />
			<SignupForm />
		</main>
	);
}

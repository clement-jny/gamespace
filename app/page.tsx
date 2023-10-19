"use client"
import React, { useState } from 'react';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';

import logo from './images/logo_gamespace.png'


export default function Home() {
	const [showSignup, setShowSignup] = useState(false);

	const toggleSignup = () => {
		setShowSignup(!showSignup);
	};

	return (
		<main>
			{showSignup ? (
				<SignupForm toggleSignup={toggleSignup} />
			) : (
				<LoginForm toggleSignup={toggleSignup} />
			)}
		</main>
	);
}

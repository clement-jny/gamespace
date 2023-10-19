'use client';

import { useState } from 'react';
import './styles.css';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
	const router = useRouter();

	const [email, setEmail] = useState('aa@aa.fr');
	const [password, setPassword] = useState('aaaaaaaa');


	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					toast.success(data.message);
					console.log('data.data.user => ', data.data.user);

					//router.push("/home"); // change to /

					// console.log('Logged in!');
				} else {
					toast.error(data.message);

					// console.log('Login failed!');
				}
			})
			.catch(err => console.log(err));

		// console.log('Submitted!');
	}

	return (
		<div className="form-container">
			<h2 className="form-title">Connexion</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label className="form-label">Email :</label>
					<input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label className="form-label">Mot de passe :</label>
					<input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>

				<button type="submit" className="form-button">Se connecter</button>

				<Link href="/register">S inscrire</Link>
			</form>
		</div>
	)
}

export default Login;
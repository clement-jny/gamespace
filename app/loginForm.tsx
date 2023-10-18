import { useState } from 'react';
import './styles.css';
import { useRouter } from 'next/router';

interface LoginFormProps {
	toggleSignup: () => void;
}

export const LoginForm = ({ toggleSignup }: LoginFormProps) => {
	//const router = useRouter();

	const [email, setEmail] = useState('aa@aa.fr');
	const [password, setPassword] = useState('aa');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: email, password: password })
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.status === 'success') {
					//localStorage.setItem('username', data.user.username);

					console.log('Logged in!');
				} else {
					alert(data.message);

					console.log('Login failed!');
				}
			})
			.catch(err => console.log(err));

		//router.push('/home');

		console.log('Submitted!');
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

				<button className="form-signup" onClick={toggleSignup}>S'inscrire</button>
			</form>
		</div>
	);
};
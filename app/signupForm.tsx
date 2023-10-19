import { use, useState } from 'react';
import './styles.css';

// CHECK HERE IF 'PASSWORD' & 'PASSWORDCONFIRM' ARE THE SAME //


//RENAME 'REGISTERFORM'
interface SignupFormProps {
	toggleSignup: () => void;
}


export const SignupForm = ({ toggleSignup }: SignupFormProps) => {
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
			body: JSON.stringify({ username: username, email: email, password: password, passwordConfirm: passwordConfirm })
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.success) {
					// add toasts to confirm registration
					//toast.success(data.message);
					// redirect to login page
					//router.push('/login');

					console.log('Register ok!');
				} else {
					(data.message); alert

					console.log('Register failed!');
				}
			})
			.catch(err => console.log(err));

		//router.push('/home');

		console.log('Submitted!');
	}

	return (
		<div className="form-container">
			<h2 className="form-title">Inscription</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label className="form-label">Nom d'utilisateur :</label>
					<input className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					<label className="form-label">Email :</label>
					<input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label className="form-label">Mot de passe :</label>
					<input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div>
					<label className="form-label">Confirmer mot de passe :</label>
					<input className="form-input" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
				</div>

				<button type='submit' className="form-button">S inscrire</button>

				<button className="form-signup" onClick={toggleSignup}>Annuler</button>
			</form>
		</div>
	);
};

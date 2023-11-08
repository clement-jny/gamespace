import { LoginForm } from './components/LoginForm';

const Login = async () => {
	return (
		<main className='grow flex items-center justify-center'>
			<div className='w-full py-10'>
				<LoginForm />
			</div>
		</main>
	)
}

export default Login;
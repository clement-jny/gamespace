import { RegisterForm } from './components/RegisterForm';

const Register = async () => {
	//TODO: remove this
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	return (
		<main className='grow flex items-center justify-center'>
			<div className='w-full py-10'>
				<RegisterForm />
			</div>
		</main>
	)
}

export default Register;
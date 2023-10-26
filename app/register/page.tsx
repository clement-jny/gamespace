import { RegisterForm } from './components/RegisterForm';

const Register = async () => {
	await new Promise((resolve) => {
		setTimeout(resolve, 1000);
	});

	return (
		// <main className='flex flex-col justify-center items-center'>
		// 	<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
		// 		<h2 className='text-3xl font-semibold text-center'>Register</h2>

		// 		<RegisterForm />
		// 	</div>
		// </main>
		<section className='py-8 bg-ct-blue-600 min-h-screen grid place-items-center'>
			<div className='w-full'>
				<h1 className='text-4xl xl:text-6xl text-center font-[600] text-ct-yellow-600 mb-4'>
					Welcome to CodevoWeb!
				</h1>
				<h2 className='text-lg text-center mb-4 text-ct-dark-200'>
					Sign Up To Get Started!
				</h2>
				<RegisterForm />
			</div>
		</section>
	)
}

export default Register;
import { RegisterForm } from "./components/RegisterForm";

const Register = () => {
	return (
		<main className='flex flex-col justify-center items-center'>
			<div className='w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl'>
				<h2 className='text-3xl font-semibold text-center'>Register</h2>

				<RegisterForm />
			</div>
		</main>
	)
}

export default Register;
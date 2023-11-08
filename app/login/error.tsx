'use client';

const Error = ({ error }: { error: Error }) => {
	return (
		<main className='grow flex items-center justify-center'>
			<p>{error.message}</p>
		</main>
	)
}

export default Error;
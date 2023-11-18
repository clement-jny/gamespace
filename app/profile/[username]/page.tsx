// import { apiGetProfileUser } from '@/lib/apiRequests';
import { User } from '@/lib/types';
import { ProductsTable } from './components/ProductsTable';

async function getData(username: string) {
	const response = await fetch(`${process.env.BASE_URL}/api/users/${username}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		}
	});

	if (!response.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return response.json()
}

type ProfileProps = {
	params: {
		username: string;
	};
}

const Profile = async ({ params: { username } }: ProfileProps) => {
	const data = await getData(username);
	// const { success, data, message } = await apiGetProfileUser(username);
	let user;

	if (data.success && data.data) {
		user = data.data.user;
	}

	const UserNotFound = () => {
		return (
			<main className='grow flex justify-center items-center'>
				<p>{data.message}</p>
			</main>
		)
	}

	const UserFound = (user: User) => {
		return (
			<main className='grow'>
				<h1 className='text-3xl font-semibold m-5'>Profile of {user.username} !</h1>

				<ProductsTable {...user.products} />
			</main>
		);
	}

	return (
		{ ...user ? <UserFound {...user} /> : <UserNotFound /> }
	);
}

export default Profile;
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
// import { apiGetAuthUser } from '@/lib/apiRequests';
import { User } from '@/lib/types';
import { AddressInfo } from './components/AddressInfo';
import { ProductsTable } from './components/ProductsTable';

async function getData(username: string) {
	const response = await fetch(`${process.env.BASE_URL}/api/users/me`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: username
	});

	if (!response.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return response.json()
}

const Dashboard = async () => {
	const session = await getServerSession(authOptions);

	const data = await getData(JSON.stringify(session!.user!));
	// const { success, data } = await apiGetAuthUser(JSON.stringify(session!.user!));
	let user: User = {} as User;

	if (data.success && data.data) {
		user = data.data.user;
	}

	return (
		<main className='grow'>
			<h1 className='text-3xl font-semibold m-5'>Hello {user.username}, welcome to your dashboard !</h1>

			<AddressInfo {...user.address} />
			<ProductsTable {...user.products} />
		</main>
	);
}

export default Dashboard;
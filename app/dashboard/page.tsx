import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import { apiGetAuthUser } from '@/lib/apiRequests';
import { User } from '@/lib/types';
import { AddressInfo } from './components/AddressInfo';
import { ProductsTable } from './components/ProductsTable';

const Dashboard = async () => {
	const session = await getServerSession(authOptions);
	const { success, data } = await apiGetAuthUser(JSON.stringify(session!.user!));
	let user: User = {} as User;

	if (success && data) {
		user = data.user;
	}

	return (
		<main className='grow'>
			<h1 className='text-3xl font-semibold text-center mt-5'>Hello {user.username}, welcome to your dashboard !</h1>

			<AddressInfo {...user.address} />
			<ProductsTable {...user.products} />
		</main>
	);
}

export default Dashboard;
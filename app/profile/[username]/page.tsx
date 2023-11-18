import { apiGetProfileUser } from '@/lib/apiRequests';
import { User } from '@/lib/types';
import { ProductsTable } from './components/ProductsTable';

type ProfileProps = {
	params: {
		username: string;
	};
}

const Profile = async ({ params: { username } }: ProfileProps) => {
	const { success, data, message } = await apiGetProfileUser(username);
	let user;

	if (success && data) {
		user = data.user;
	}

	const UserNotFound = () => {
		return (
			<main className='grow flex justify-center items-center'>
				<p>{message}</p>
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
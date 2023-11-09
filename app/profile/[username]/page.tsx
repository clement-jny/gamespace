import { apiGetProfileUser } from '@/lib/apiRequests';

type ProfileProps = {
	params: {
		username: string;
	};
}

// TODO: do profile page, show username and products
const Profile = async ({ params: { username } }: ProfileProps) => {
	const { success, data, message } = await apiGetProfileUser(username);

	let user;
	if (success && data) {
		user = data.user;
	}

	return (
		<main className='grow'>
			{user ? (
				<>
					<div>Profile page of : {user.username}</div>
					<div>First article : {user.products[0].title}</div>
				</>
			) : (
				<p>{message}</p>
			)}
		</main>
	)
}

export default Profile;
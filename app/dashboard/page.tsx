import { ProfileInfo } from './components/ProfileInfo';
import { AddressInfo } from './components/AddressInfo';
import { ProductInfo } from './components/ProductInfo';
import { TableProduct } from './components/TableProduct';

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { apiGetAuthUser } from '@/lib/apiRequests';


// type User = {
// 	id: string;
// 	password: string;
// 	username: string;
// }


//TODO: get the auth user by the username in the cookie and get all infos (address, products, etc...)
//TODO: fix TableProduct component
const Dashboard = async () => {
	const session = await getServerSession(authOptions);
	const response = await apiGetAuthUser(JSON.stringify(session?.user!));

	const user = response.success && response.data && response.data.user;
	console.log(user);


	return (
		<main className='grow flex items-center justify-center'>
			{/* <section className='bg-ct-blue-600 min-h-screen pt-20'>
				<div className='max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-center items-center'>
					<div>
						<p className='mb-3 text-5xl text-center font-semibold'>
							Dashboard Page
						</p>
						<div className='mt-8'>
							<p className='mb-3'>Id: {user.id}</p>
							<p className='mb-3'>Name: {user.username}</p>
							<p className='mb-3'>Email: {user.email}</p>
							<p className='mb-3'>Role: {user.password}</p>
							<p className='mb-3'>Verified: {String(user.address.city)}</p>
						</div>
					</div>
				</div>
			</section> */}

			<div className='container mx-auto p-4'>
				<div className='flex items-center space-x-2'>
					<div className='avatar online placeholder'>
						<div className='bg-neutral-focus text-neutral-content rounded-full w-16 '>
							<span className='text-xl'>JO</span>
						</div>
					</div>
					<h1 className='text-2xl font-semibold mb-4 mt-5'>Hello { }</h1>
				</div>

				<ProfileInfo />
				<AddressInfo />
				<h2 className='text-2xl font-semibold mb-2 mt-4 text-center'> Articles mis en ventes</h2>
				{/* <TableProduct /> */}
			</div>
		</main>
	);
}

export default Dashboard;
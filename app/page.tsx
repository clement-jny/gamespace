import { LoadingButton } from "@/components/LoadingButton";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth/next"


// TODO: do home page
const Home = async () => {
	const session = await getServerSession(authOptions)

	return (
		<main className='grow flex items-center justify-center'>
			<p>Home page</p>

			<div>
				{session ? (
					<>
						<p>Connected</p>
						{JSON.stringify(session)}
					</>
				) : (
					<p>Not connected</p>
				)}
			</div>
		</main>
	);
}

export default Home;
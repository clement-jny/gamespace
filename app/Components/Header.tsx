import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/images/logo.png';

export const Header = () => {
	return (
		<>
			<div className='w-full bg-black top-0  flex items-center pt-16 text-white underline'>
				<Link href='/' className='ml-16' >
					<Image
						className='ml-16'
						src={logo}
						height={150}
						width={150}
						alt=''
					/>
				</Link>


				<h1 className='text-white font-bold text-4xl'>
					Game Space, site de revente de jeux vidéos
				</h1>

				<Link className=' font-bold border-2 rounded-lg ml-10 p-2' href='/connection'>
					Se connecter
				</Link>
			</div>
		</>
	)
}
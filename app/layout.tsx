import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GameSpace'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${montserrat.className} h-screen`}>
				<Toaster position='top-right' />

				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
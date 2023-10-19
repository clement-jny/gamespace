import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Footer from './Components/Footer'
import Header from './Components/Header'

import './globals.css';
import type { Metadata } from 'next';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'GameSpace'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
        <Toaster position='top-right' />
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
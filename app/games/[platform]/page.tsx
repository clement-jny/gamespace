// import { apiGetPlatformProducts } from '@/lib/apiRequests';
import { Product } from '@/lib/types';
import { ProductsTable } from './components/ProductsTable';

async function getData(platform: string) {
	const response = await fetch(`${process.env.BASE_URL}/api/products/${platform}`, {
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

type PlatformProps = {
	params: {
		platform: string;
	};
}

const Platform = async ({ params: { platform } }: PlatformProps) => {
	const data = await getData(platform);
	// const { success, data, message } = await apiGetPlatformProducts(platform);
	let products;

	if (data.success && data.data) {
		products = data.data.products;
	}

	const PlatformNotFound = () => {
		return (
			<main className='grow flex justify-center items-center'>
				<p>{data.message}</p>
			</main>
		)
	}

	const PlatformFound = (products: Product[]) => {
		return (
			<main className='grow'>
				<h1 className='text-3xl font-semibold m-5'>Platform {platform} !</h1>

				<ProductsTable {...products} />
			</main>
		);
	}

	return (
		{
			...products ? <PlatformFound {...products} /> : <PlatformNotFound />
		}
	)
}

export default Platform;
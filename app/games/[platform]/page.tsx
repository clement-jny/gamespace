import { apiGetPlatformProducts } from '@/lib/apiRequests';
import { Product } from '@/lib/types';
import { ProductsTable } from './components/ProductsTable';

type PlatformProps = {
	params: {
		platform: string;
	};
}

const Platform = async ({ params: { platform } }: PlatformProps) => {
	const { success, data, message } = await apiGetPlatformProducts(platform);
	let products;

	if (success && data) {
		products = data.products;
	}

	const PlatformNotFound = () => {
		return (
			<main className='grow flex justify-center items-center'>
				<p>{message}</p>
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
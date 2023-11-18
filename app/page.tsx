// import { apiGetProducts } from "@/lib/apiRequests";
import { Product } from "@/lib/types";
import Image from 'next/image';

async function getData() {
	const response = await fetch(`${process.env.BASE_URL}/api/products`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});


	if (!response.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return response.json()
}

const Home = async () => {
	// const { success, data } = await apiGetProducts();
	// let products: Product[] = [] as Product[];

	// if (success && data) {
	// 	products = data.products;
	// }

	// const data = await getData();
	// console.log(data.data.products);


	return (
		<main className='grow'>
			<h1 className='text-3xl font-semibold m-5'>Here are the 5 last added products</h1>

			<table className='table w-[90%] m-4 mx-auto'>
				<thead>
					<tr>
						<th>Image</th>
						<th>Title</th>
						<th>Description</th>
						<th>Informations</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{
						// data.data.products.map((product: Product) => (
						// 	<tr key={product.id}>
						// 		<td>
						// 			<Image src={product.images[0].url} width={120} height={120} alt={product.title} />
						// 		</td>
						// 		<td>{product.title}</td>
						// 		<td>{product.description}</td>
						// 		<td>{product.platform} - {product.productCondition}</td>
						// 		<td>{product.price}€</td>
						// 	</tr>
						// ))
					}
				</tbody>
			</table>
		</main>
	);
}

export default Home;
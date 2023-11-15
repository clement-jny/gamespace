import { Product } from '@/lib/types';
import { ProductInfo } from './ProductInfo';

export const ProductsTable = (products: Product[]) => {
	return (
		<section className='card w-[90%] shadow-xl m-4 mx-auto'>
			<div className='card-body'>
				<h2 className='card-title'>Your products</h2>

				<table className='table'>
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
						{Object.values(products).map((product) => (
							<ProductInfo key={product.id} {...product} />
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
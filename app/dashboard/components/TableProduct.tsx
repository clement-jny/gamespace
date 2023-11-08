import { ProductInfo } from './ProductInfo';

//TODO: refactor to use Product model from db

const productsData = [
	{
		id: "1",
		title: 'Jeux Rocket League',
		description: 'Je vends ce jeu car je n\'y joue plus.',
		productCondition: 'MINT',
		platform: 'XBOX',
	},
	{
		id: "2",
		title: 'Jeux Rocket League 2',
		description: 'Je vends ce jeu car je n\'y joue plus.',
		productCondition: 'MINT',
		platform: 'XBOX',
	},
	// Ajoutez d'autres produits ici
];

export const TableProduct = () => {
	return (
		<div className='overflow-x-auto'>
			{productsData.map((product, index) => (
				// <ProductInfo key={index} product={product} />
				<ProductInfo
					key={index}
					id={product.id}
					title={product.title}
					description={product.description}
					platform={product.platform}
					productCondition={product.productCondition}
				/>
			))}
		</div>
	)
}

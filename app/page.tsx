const Home = async () => {
	return (
		<main className='grow'> {/* flex items-center justify-center */}
			<h1 className='text-3xl font-semibold m-5'>Here are the 10 last products</h1>

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
					{/* {Object.values(products).map((product) => (
						<ProductInfo key={product.id} {...product} />
					))}

					<tr>
						<td>
							<Image src={images[0].url} width={120} height={120} alt={title} />
						</td>
						<td>{title}</td>
						<td>{description}</td>
						<td>{platform} - {condition}</td>
						<td>{price}€</td>
					</tr> */}
				</tbody>
			</table>
		</main>
	);
}

export default Home;
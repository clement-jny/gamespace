'use client';

//TODO: refactor to use Product model from db

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Product = {
	id: string,
	title: string,
	description: string,
	platform: string,
	productCondition: string,
}

export const ProductInfo = ({ id, title, description, platform, productCondition }: Product) => {
	const [productInfo, setProductInfo] = useState({
		title: 'Jeux Rocket League',
		description: 'Je vends ce jeu car je n\'y joue plus.',
		productCondition: 'MINT',
		platform: 'XBOX',
	});

	// useEffect(() => {
	// 	//COnnexion
	// 	console.log(product);

	// }, []);

	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full'>
				<div className='bg-white p-4 rounded-lg shadow-md mt-2 flex'>
					<figure>
						<Image
							src='/images/rocket_game.jpg'
							className='w-36 h-36 object-cover flex'
							width={500}
							height={500}
							alt='jeu'
						/>
					</figure>
					<div className='p-4'>
						<h2 className='text-2xl font-semibold mb-2'>{productInfo.title}</h2>
						<div className='mb-2'>
							<strong>État du produit:</strong> {productInfo.productCondition}
						</div>
						<div className='mb-2'>
							<strong>Plateforme:</strong> {productInfo.platform}
						</div>
						<p>{productInfo.description}</p>
					</div>
				</div>
			</table>
		</div>

	)
}
import { Product } from '@/lib/types';
import Image from 'next/image';

export const ProductInfo = ({ title, description, price, platform, condition, images }: Product) => {
	return (
		<tr>
			<td>
				<Image src={images[0].url} width={120} height={120} alt={title} />
			</td>
			<td>{title}</td>
			<td>{description}</td>
			<td>{platform} - {condition}</td>
			<td>{price}€</td>
		</tr>
	)
}

import { Address } from '@/lib/types';

export const AddressInfo = ({ street, city, zipCode }: Address) => {
	return (
		<section className='card w-[90%] shadow-xl m-4 mx-auto'>
			<div className='card-body'>
				<h2 className='card-title'>Address information</h2>

				<p><strong>Street: </strong>{street}</p>
				<p><strong>City: </strong>{city}</p>
				<p><strong>Zip code: </strong>{zipCode}</p>
			</div>
		</section>
	)
}
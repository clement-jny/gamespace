'use client';

import React from 'react';
import { ProfileInfo } from './components/ProfileInfo';
import { AddressInfo } from './components/AddressInfo';
import { ProductInfo } from './components/ProductInfo';
import { TableProduct } from './components/TableProduct';

const Account = () => {
	return (
		<div className="container mx-auto p-4">
			<div className="flex items-center space-x-2">
				<div className="avatar online placeholder">
					<div className="bg-neutral-focus text-neutral-content rounded-full w-16 ">
						<span className="text-xl">JO</span>
					</div>
				</div>
				<h1 className="text-2xl font-semibold mb-4 mt-5"> Username </h1>
			</div>

			<ProfileInfo />
			<AddressInfo />
			<h2 className="text-2xl font-semibold mb-2 mt-4 text-center"> Articles mis en ventes</h2>
			<TableProduct />
		</div>
	);
}

export default Account;
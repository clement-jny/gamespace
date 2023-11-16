export type ApiResponseUser = {
	success: boolean;
	message: string;
	data?: { user: User } | undefined;
}

export type ApiResponseProducts = {
	success: boolean;
	message: string;
	data?: { products: Product[] } | undefined;
}

export type User = {
	id: string;
	password: string;
	username: string;
	address: Address;
	products: Product[];
}
export type Address = {
	id: string;
	street: string;
	city: string;
	zipCode: string;
}
export type Product = {
	id: string;
	title: string;
	description: string;
	price: number;
	platform: Platform;
	condition: ProductCondition;
	images: Image[];
}
export type Platform = 'PLAYSTATION' | 'XBOX' | 'NINTENDO';
export type ProductCondition = 'MINT' | 'GOOD' | 'POOR';

export type Image = {
	id: string;
	url: string;
}
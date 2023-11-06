export type User = {
	id: string;
	email: string;
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


export type ApiResponse = {
	success: boolean;
	message: string;
}
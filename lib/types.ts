export interface FilteredUser {
	id: string;
	email: string;
	password: string;
	username: string;
	address: Address;
	products: Product[];
}
export interface Address {
	id: string;
	street: string;
	city: string;
	zipCode: string;
}
export interface Product {
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
export interface Image {
	id: string;
	url: string;
}

export interface UserResponse {
	status: string;
	data: {
		user: FilteredUser;
	};
}

export interface UserLoginResponse {
	status: string;
	token: string;
}



// export type AuthUser = {
// 	id: string;
// 	username: string;
// 	email: string;
// 	password: string;
// }
// export interface UserResponse {
// 	status: string;
// 	data: {
// 		user: AuthUser;
// 	};
// }

// export interface UserLoginResponse {
// 	status: string;
// 	token: string;
// }


//---------------------------------------------
// export type User = {
// 	username: string;
// 	email: string;
// 	password: string;
// 	address: Address;
// 	products: Product[];
// }
// export type Address = {
// 	street: string;
// 	city: string;
// 	zipCode: string;
// }
// export type Product = {
// 	title: string;
// 	description: string;
// 	price: number;
// 	images: Image[];
// 	platform: Platform;
// 	condition: ProductCondition;
// }
// export type Platform = 'PLAYSTATION' | 'XBOX' | 'NINTENDO';
// export type ProductCondition = 'MINT' | 'GOOD' | 'POOR'

// export type Image = {
// 	url: string;
// }
//---------------------------------------------

// export type UserResponse = {
// 	status: string;
// 	data: {
// 		user: AuthUser;
// 	};
// }

// export type UserLoginResponse = {
// 	status: string;
// 	token: string;
// }
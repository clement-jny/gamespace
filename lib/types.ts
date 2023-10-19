export type AuthUser = {
	id: string;
	username: string;
	email: string;
	password: string;
}
export interface UserResponse {
	status: string;
	data: {
		user: AuthUser;
	};
}

export interface UserLoginResponse {
	status: string;
	token: string;
}


//---------------------------------------------
export type User = {
	username: string;
	email: string;
	password: string;
	address: Address;
	products: Product[];
}
export type Address = {
	street: string;
	city: string;
	zipCode: string;
}
export type Product = {
	title: string;
	description: string;
	price: number;
	images: Image[];
	platform: Platform;
	condition: ProductCondition;
}
export type Platform = 'PLAYSTATION' | 'XBOX' | 'NINTENDO';
export type ProductCondition = 'MINT' | 'GOOD' | 'POOR'

export type Image = {
	url: string;
}
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
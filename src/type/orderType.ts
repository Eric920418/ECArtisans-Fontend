export interface Product {
	_id: string;
	sellerCategory: any[];
	category: any[];
	isOnshelf: boolean;
	reviews: any[];
	sold: number;
	productName: string;
	type: number[];
	sellerType: any[];
	origin: string;
	ingredient: string;
	format: {
			_id: string;
			title: string;
			price: number;
			cost: number;
			stock: number;
			color: string[];
	}[];
	introduce: string;
	production: string;
	state: boolean;
	evaluate: any[];
	haveStore: string;
	fare: number;
	pay: string[];
	keyword: any[];
	image: string[];
}

export interface Order {
	_id: string;
	orderNumber: string;
	date: string;
	products: Product[];
	state: number;
	price: number;
	pay: number;
}

export interface ApiResponse {
	status: string;
	thisShop: Order;
}
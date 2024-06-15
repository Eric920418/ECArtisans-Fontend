// 商品詳細
export interface DetailedOrderProduct { 
	_id: string;
	seller_id?: string;
	sellerCategory: Array<number>; //商品主要類別
	category: any[];
	isOnshelf: boolean;

	review?: any[];
	reviews?: any[];

	sold: number;
	productName: string;
	type: number[];
	sellerType: any[];
	origin: string;
	ingredient: string;
	introduction?: string;
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
	pay: Array<number>; //1:信用卡付款 2.ATM匯款 3.店到店付費

	keyword?: any[];
	keywords?: any[];
	createAt?: string;
	updateAt?: string;
	image: string[];
}

// 詳細的訂單類型
export interface DetailedOrder {
  _id: string;
  orderNumber: string;
  date: string;
  products: DetailedOrderProduct[];
  state: number;
  price: number;
  pay: number;
}


// 查詢所有訂單的訂單型態
export interface Order {
	_id: string;
	orderNumber: string;
	date: string;
	products: string[];
	state: number;
	price: number;
	pay: number;
}


export interface ApiResponse {
	status: string;
	thisShop: Order;
}

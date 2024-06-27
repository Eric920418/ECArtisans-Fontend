// 商品詳細
export interface DetailedOrderProductType {
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
	format: Array<FormatType>;
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
export interface DetailedOrderType {
	_id: string;
	orderNumber: string;
	date: string;
	products: DetailedOrderProductType[];
	state: number;
	price: number;
	pay: number;
}

// 查詢所有訂單的訂單型態
export interface OrderType {
	_id: string;
	products: OrderFormatType[];
	state: number;  //訂單狀態  0:未付, 1:已付
	totalPrice: number; //訂單總金額
	createdAt: string; //訂單建立時間
	updatedAt: string; // 訂單最後更新時間
}

export interface OrderFormatType {
	format: {
		image: string
	}
}

export interface ApiResponseType {
	status: string;
	thisShop: OrderType;
}
export interface FormatType {
	_id?: string;
	title: string;
	price: number;
	cost: number;
	stock: number;
	color: string[];
}

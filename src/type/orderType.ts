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
	user: string; // user id
	seller: {
		_id: string; // seller id
	};
	products: OrderProductType[];
	state: number; // 訂單狀態 0:未付, 1:已付
	totalPrice: number; // 訂單總金額
	pay: number; // 付款方式 1:信用卡付款, 2:ATM匯款, 3:店到店付費
	address: string; // 地址
	delivery: number; // 配送方式 1:宅配, 2:黑貓宅急便, 3:店到店
	fare: number; // 運費
	createdAt: string; // 訂單建立時間
	updatedAt: string; // 訂單最後更新時間
}

export interface OrderProductType {
	product: {
		_id: string; // 商品id
	};
	format: ProductFormatType;
	quantity: number; // 購買的數量
	price: number; // 此產品的總價
	_id: string; // 此訂單產品的唯一id
}

export interface ProductFormatType {
	title: string; // 規格名稱
	price: number; // 價錢
	cost: number; // 成本
	stock: number; // 庫存量
	image: string; // 商品圖片
	color: string[]; // 顏色
	_id: string; // 規格的id
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
export interface ShopProductsType {
	products_id: string;
	products_name: string;
	products_images: Array<string>;
	products_info: string;
	production_material: string;
	production_method: string;
	production_country: string;
	payment: string;
	freight: number;
	stock: number;
	price: number;
	total_sales: number;
	discount: string[];
	star: number;
	total_collect: number;
}

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
	products: {
		format: ProductFormat;
	}[];
	state: number;
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
}

export interface UserOrderType {
	_id: string;
	user: string;
	seller: {
		_id: string;
	};
	products: {
		product: {
			_id: string;
		};
		format: {
			title: string;
			price: number;
			cost: number;
			stock: number;
			image: string;
			color: string[];
			_id: string;
		};
		quantity: number;
		price: number;
		_id: string;
		review: string;
	}[];
	state: number;
	totalPrice: number;
	pay: number;
	address: string;
	delivery: number;
	fare: number;
	createdAt: string;
	updatedAt: string;
}

export interface OrderDetailType {
	_id: string;
	user: {
		_id: string;
	};
	seller: string; // 假設賣家用字串表示其 ID
	products: {
		product: {
			_id: string; // 商品 ID
		};
		format: {
			title: string;
			price: number;
			cost: number;
			stock: number;
			image: string;
			color: string[];
			_id: string; // 規格 ID
		};
		quantity: number;
		price: number;
		_id: string; // 訂單產品 ID
		review?: string; // 可能有評論的欄位，可根據需要選擇是否包含
	}[];
	state: number; // 訂單狀態
	totalPrice: number; // 訂單總價
	pay: number; // 付款方式
	address: string; // 地址
	delivery: number; // 配送方式
	fare: number; // 運費
	createdAt: string; // 建立時間
	updatedAt: string; // 更新時間
}

export interface ProductFormat {
	image: string;
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
	products_format: Array<ShopFormatType>;
	products_name: string;
	all_images: any;
	products_info: string;
	production_material: string;
	production_method: string;
	production_country: string;
	payment: string;
	freight: number;
	stock: number;
	total_sales: number;
	discount: Array<string>;
	star: number;
	total_collect: number;
	seller_name: string;
	seller_id: string;
	shop_image: string;
}

export interface ShopFormatType {
	format_id: string;
	format_title: string;
	price: number;
	image: string;
}
// // 原本得先保留
// export interface ShopProductsType {
// 	products_id: string;
// 	products_name: string;
// 	products_images: Array<string>;
// 	products_info: string;
// 	production_material: string;
// 	production_method: string;
// 	production_country: string;
// 	payment: string;
// 	freight: number;
// 	stock: number;
// 	price: number;
// 	total_sales: number;
// 	discount: string[];
// 	star: number;
// 	total_collect: number;
// }

// 查詢賣家頁面所有資訊
export interface SellerPageType {
	seller_id: string;
	activities_images?: string[];
  seller_image?: string;
  seller_name: ''
	seller_info: string;
}

// 查詢賣家頁面所有商品資訊
export interface SellerPageProductType {
	products_id: string;
	products_name: string;
	products_images?: string;
	seller_name?: string;
	total_sales: number;
	price: number;
  discount:string[],
	star: number;
}

// 查詢推薦商家
export interface RecommendShopType {
	seller_id: string,
	shop_name: string,
	shop_image: string,
	product_images: string[],
	star: number,
	total_comments: number,
}


/* 商品總覽、搜尋bar */
export interface ProductFormat {
	format_id: string;
	format_price: number;
	format_color: string[];
}

export interface Product {
	products_id: string;
	products_name: string;
	products_image: string;
	shop_name: string;
	price: number[];
	origin: string;
	total_sales: number;
	discount: string[];
	star: number | null;
	products_format: ProductFormat[];
}

// 最終型態
// export interface SearchProduct {
// 	products_id: string;
// 	products_name: string;
// 	products_images: string;
// 	shop_name: string;
// 	price: number;
// 	origin: string;
// 	total_sales: number;
// 	discount: string[];
// 	star: number;
// 	color: string[];
// }

export interface SearchProduct extends SellerPageProductType {
	origin: string;
	color: string[];
	shop_name: string; // Assuming shop_name is part of SellerPageProductType
}

export interface BannerType {
	activity_id: string,
	seller_id: string,
	activity_image?: string
	activity_images?: string[]

}
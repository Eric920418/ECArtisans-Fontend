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
	seller_name: string;
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
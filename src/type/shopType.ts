// 查詢賣家頁面所有資訊
export interface SellerPageType {
	seller_id: string;
	activies_img?: string[];
  seller_image?: string;
  seller_name: ''
	seller_info: string;
	seller_info_date: string;
	discount: string;
  products: SellerPageProductType[]; // 新增的 products 属性
}

// 查詢賣家頁面所有商品資訊
export interface SellerPageProductType {
	products_id: string;
	products_name: string;
	products_images: string;
	seller_name: string;
	total_sales: number;
	price: number;
  discount:string,
	star: number;
}
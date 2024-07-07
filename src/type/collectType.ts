export interface collectType {
	_id: string;
	sellerOwned: string;
	productName: string;
	format: Array<collectFormatType>;
	image: Array<string>;
	reviews: [];
	sold: number;
}
export interface collectFormatType {
	_id: string;
	title: string;
	price: number;
	cost: number;
	stock: number;
	image: string;
	color: Array<string>;
}

export interface coupon {
	_id: string;
	seller_id: string;
	couponName: string;
	startDate: string | Date;
	endDate: string | Date;
	type: number; //0折抵,1免運
	discountCondition: number; //折抵條件
	percentage: number; //抵折幾折(已百分比衡量)
	productType: number; //抵折範圍(0:全館、1:商家、2:指定商品)
	productChoose?: Array<any>; //抵折商品選擇(上面選2才要選這個)
	isEnabled: Boolean; //啟用
}

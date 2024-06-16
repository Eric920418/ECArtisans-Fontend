export interface CouponType {
	_id: string;
	seller_id?: string;
	seller?: Object;
	couponName: string | null;
	startDate: string | Date | null;
	endDate: string | Date | null;
	type: number | null; //0折抵,1免運
	discountConditions: number | null; //折抵條件
	percentage: number | null; //抵折幾折(已百分比衡量)
	productType: number | null; //抵折範圍(0:全館、1:商家、2:指定商品)
	productChoose?: Array<any> | Array<void>; //抵折商品選擇(上面選2才要選這個)
	isEnabled: Boolean; //啟用
}

export interface activityType {
	activity_id: String;
	seller_id: String;
	activity_name: String;
	activity_image: String;
	start_date: String;
	end_date: String;
	activity_info: String;
	coupon_id: String;
}
export interface activityAllType {
	activity_id?: String;
	activity_name: String;
	activity_image: String;
	start_date: String;
	end_date: String;
	activity_info?: string | null;
	coupon_id?: string | null;
}
// export interface activityAllType {
// 	activity_id: String;
// 	activity_name: String;
// 	activity_image: String;
// 	start_date: String;
// 	end_date: String;
// }

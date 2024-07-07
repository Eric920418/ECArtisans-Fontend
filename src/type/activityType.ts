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
	activity_image: String | null;
	start_date: String | Date | null;
	end_date: String | Date | null;
	activity_info?: String | null;
	coupon_id?: String | null;
}

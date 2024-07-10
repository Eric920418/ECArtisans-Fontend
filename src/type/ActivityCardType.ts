export interface BtnType {
	title: String;
	go: Object; //轉跳 to 的內容
}

export interface ActivityCardType {
	go?: Object; // Card 轉跳 to 的內容
	seller?: String;
	img?: String;
	title: string | null;
	state?: boolean; // 狀態：啟用中
	type?: number | null; //優惠劵 型態 Ex:免運劵、優惠劵
	percentage?: number | null; //優惠劵 型態 Ex:免運劵、優惠劵
	id?: string; //編號
	date?: {
		//有效日期
		sDate: string;
		eDate: string;
	};
	btn?: Array<BtnType>;
}

export interface NavTabsTitleType {
	title: string;
	goBack?: boolean;
	path?: {
		name: string;
		query?: any;
	};
	// {name:...}
}

export interface NavTabsType {
	routeName: string;
	title: Array<NavTabsTitleType>;
	// navTabsTitle [ {...資料 } , { ...資料 } ]
	schedule: string; // '預設頁面名稱'
	breadcrumb?: boolean; // '是否為 麵包屑 例如：優惠劵 > 新增優惠劵 '
	btn?: {
		//右邊的按鈕，目前預設只有一個
		title: string; //按鈕-名稱
		path: Object; //按鈕-路由
	};
}

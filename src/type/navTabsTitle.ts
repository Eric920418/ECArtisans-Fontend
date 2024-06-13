export interface navTabsTitle {
	title: String;
	goBack?: boolean;
	path?: Object;
	// {name:...}
}

export interface navTabs {
	title: Array<navTabsTitle>;
	// navTabsTitle [ {...資料 } , { ...資料 } ]
	schedule: string; // '預設頁面名稱'
	breadcrumb?: boolean; // '是否為 麵包屑 例如：優惠劵 > 新增優惠劵 '
	btn?: {
		//右邊的按鈕，目前預設只有一個
		title: String; //按鈕-名稱
		path: Object; //按鈕-路由
	};
}

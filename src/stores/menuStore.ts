export const sellerMenu = [
	//商家頁面的目錄
	{
		title: '商家中心',
		path: { name: 'SellerOverview' },
	},
	{
		title: '商家資訊',
		path: { name: 'SellerProfile' },
	},
	// {
	// 	title: '商品管理',
	// 	path: { name: 'SellerProduct', query: { page: 1 } },
	// },
	{
		title: '訂單管理',
		path: { name: 'SellerOrder', query: { page: 1 } },
	},
	{
		title: '優惠劵管理',
		path: { name: 'SellerCoupon', query: { page: 1 } },
	},
	{
		title: '活動管理',
		path: { name: 'SellerActivity', query: { page: 1 } },
	},
	/*
    {
      title: '業績分析',
      path: 'SellerPerformance',
    },
    {
      title: '聊聊',
      path: 'SellerMessage',
    },
  */
];

export const userMenu = [
	//會員頁面的目錄
	{
		title: '會員資訊',
		path: { name: 'UserProfile' },
	},
	{
		title: '收藏清單',
		path: { name: 'UserProduct' },
	},
];

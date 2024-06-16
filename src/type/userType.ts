export interface UserDataType {
	_id?: string;
	name: string | undefined | null;
	gender: string | undefined | null;
	avatar?: string | undefined | null;
	phone: string | undefined | null;
	mail: string | undefined | null;
	address: string | undefined | null;
	password?: string | undefined | null;
	confirmPassword?: string | undefined | null;
	otherPassword?: string | undefined | null;

	// 會員
	birthday?: string | undefined | null;
	discount?: any | undefined | null;
	spHistory?: any | undefined | null;
	likeShop?: any | undefined | null;
	collect?: any | undefined | null;
	chat?: any | undefined | null;

	// 商家
	bossName?: string | undefined | null;
	brand?: string | undefined | null;
	plan?: string | undefined | null;
	planPeriod?: Date | undefined | null; //方案到期日|string
	introduce?: string | undefined | null;
	salesType?: any | undefined | null;
	collection?: string | undefined | null;
}

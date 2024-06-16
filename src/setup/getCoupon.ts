export function getCoupon(isType: number, percentage: number | void) {
	if (isType === 0 && percentage) {
		const number = percentage / 10;
		return number.toString() + ' 折';
	} else if (isType === 0) {
		return '折抵劵';
	} else if (isType === 1) {
		return '免運劵';
	}

	return '格式有錯';
}

export function dateAndToDay(text: string | null | Date): boolean {
	if (text) {
		const date = new Date(text);
		const toDay = new Date();
		date.setHours(0, 0, 0, 0);
		toDay.setHours(0, 0, 0, 0); //設置為當天的 23:59:59.999
		if (toDay >= date) {
			return true;
		}
	}
	return false;
}

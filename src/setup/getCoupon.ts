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

export function getDate(data: number) {
	const date = new Date(data * 1000); // 使用時間戳創建一個Date對象
	const Y = date.getFullYear() + '-';
	const M =
		(date.getMonth() + 1 < 10
			? '0' + (date.getMonth() + 1)
			: date.getMonth() + 1) + '-';
	const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	// const h = date.getHours() + ':';
	// const m = date.getMinutes() + ':';
	// const s = date.getSeconds();
	return `${Y}${M}${D}`;
}

export function getTimestamp(date: string, dateType: String) {
	if (dateType !== 'now') {
		const newDate = new Date(date);
		if (dateType === 'start') newDate.setHours(0, 0, 0, 0);
		if (dateType === 'end') newDate.setHours(23, 59, 59, 999);
		return Math.floor(newDate.getTime() / 1000);
	}
	if (dateType === 'now') {
		const timestamp = Math.floor(Date.now() / 1000);
		return timestamp;
	}
	return;
}
// 將自定義規則添加到 vee-validate

// 其他驗證方法 --------------------------------------------END

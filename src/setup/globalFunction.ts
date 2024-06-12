import { type App } from 'vue';
import router from '@/router';

// 前往??
export function go(path: string | Record<string, any>): void {
	router.push(path);
}

// 改變網站 title 的名稱
export function title(text: string): string {
	document.title = text;
	return text;
}

export function getDate(isoDate: string) {
	const date = new Date(isoDate);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是從0開始的，所以要加1
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

// 全預註冊
const global = {
	install(app: App) {
		app.config.globalProperties.$go = go;
		app.provide('go', go);

		app.config.globalProperties.$title = title;
		app.provide('title', title);

		app.config.globalProperties.$getDate = getDate;
		app.provide('getDate', getDate);
	},
};

export default global;

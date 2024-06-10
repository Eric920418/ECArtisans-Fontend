import { type App } from 'vue';
import router from '@/router';

// 前往??
function go(path: string | Record<string, any>): void {
	router.push(path);
}

// 改變網站 title 的名稱
function title(text: string): string {
	document.title = text;
	return text;
}

// 全預註冊
const global = {
	install(app: App) {
		app.config.globalProperties.$go = go;
		app.provide('go', go);

		app.config.globalProperties.$title = title;
		app.provide('title', title);
	},
};

export default global;

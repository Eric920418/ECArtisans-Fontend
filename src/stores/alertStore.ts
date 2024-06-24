import { defineStore } from 'pinia';

type MessageType = {
	icon: string | null;
	text: string;
};
type ToastType = {
	message: MessageType;
	type: string;
	icon: string | null;
	show: boolean;
	timestamp: number;

	text: string;
};

type messageArray = {
	[key: string]: MessageType; // 使用 ToastType 类型替代 string 类型
};

export const useAlertStore = defineStore({
	id: 'alert', //警報
	state: () => ({
		toasts: [] as Array<ToastType>,
		message: {
			// icon = null 就是不要 icon
			logIn: { icon: 'circle-check', text: '登入成功' },
			logError: { icon: 'circle-xmark', text: '登入失敗' },
			logOut: { icon: 'circle-check', text: '登出成功' },
			renewOK: { icon: 'circle-check', text: '更新成功' },
			renewError: { icon: 'circle-xmark', text: '更新失敗' },
			showError: { icon: 'circle-xmark', text: '讀取資料失敗' },
			registerOK: { icon: 'circle-check', text: '註冊成功，返回登入頁面' },
			couponDelete: { icon: 'trash', text: '優惠劵刪除成功' },
			couponOK: { icon: 'circle-check', text: '已取得優惠劵' },
			focusShopOK: { icon: 'house-circle-check', text: '商家已加入關注' },
			focusShopFail: { icon: 'house-chimney-crack', text: '已取消關注商家' },
			focusProductOK: { icon: 'heart', text: '商品已加入收藏' },
			focusProductFail: { icon: 'heart-crack', text: '已取消收藏商品' },
			error: { icon: 'circle-exclamation', text: '系統發生未預期的錯誤' },
		} as messageArray,
		delayTime: 3000, // 延遲時間
		nextTimestamp: 1, // index
	}),
	actions: {
		success(index: string): any {
			this.addToast(index, 'toast');
		},
		error(index: string): any {
			this.addToast(index, 'error');
		},
		addToast(index: string, toastType: string) {
			let message = this.message[index] as MessageType;
			if (!message) message = { icon: null, text: index } as MessageType;
			const timestamp = this.nextTimestamp++; //index

			const ToastType = {
				message: message.text,
				type: toastType,
				icon: message.icon,
				show: true,
				timestamp: timestamp,
			} as ToastType | any;
			this.toasts.push(ToastType);

			setTimeout(() => {
				this.removeToast(timestamp);
			}, this.delayTime);
		},
		removeToast(timestamp: number) {
			const index = this.toasts.findIndex(
				ToastType => ToastType.timestamp === timestamp
			);
			if (index !== -1) {
				this.toasts.splice(index, 1);
			}
		},
		showToast(timestamp: number) {
			const index = this.toasts.findIndex(
				ToastType => ToastType.timestamp === timestamp
			);
			if (index !== -1) {
				this.toasts[index].show = false;
			}
		},
	},
});

import { defineStore } from 'pinia';
import router from '@/router/index';
import { sellerLogin, userLogin } from './api';
import { alertStore } from '@/main'; // 導入實例

interface UserDataType {
	mail: string;
	password: string;
}

function initialState() {
	return {
			token: '',
			id: '',
			isLoggedIn: false,
			isLoading: false,
			accountType: '',
			expirationTime: null as number | null // token過期時間

	};
}

export const useAuthStore = defineStore({
	id: 'auth',
	state: () => initialState(),
	actions: {
		async login(data: UserDataType): Promise<void> {
			this.reset();
			await this.setAccountType();
			if (data.mail !== '' && data.password !== '') {
				if (this.accountType !== '') {
					this.isLoading = true;
					try {
						await this.setAccountType();
						// const { user } = await sellerLogin(data);
						let res;
						if (this.accountType === 'seller') {
							res = await sellerLogin(data);
						} else if (this.accountType === 'user') {
							res = await userLogin(data);
						}
						const { user } = res;
						await this.handleLoginSuccess(user);
					} catch (error) {
						await this.handleLoginError(error);
					} finally {
						this.isLoading = false;
					}
				} else {
					alertStore.error('找不到路徑');
				}
			} else {
				alertStore.error('帳號密碼不可為空');
			}
		},
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.href;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		async handleLoginSuccess(user: any): Promise<void> {
			// 如果已經有登入狀態代表可能是買家或商家身份進入沒有權限的頁面被router返回重新登入
			if (this.isLoggedIn && this.accountType !== '') {
				this.reset();
			} else {
				this.isLoggedIn = true;
				alertStore.success('logIn');
			}
			this.token = user.token;
			const tokenPayload = JSON.parse(atob(user.token.split('.')[1]));
      this.id = tokenPayload.id;
      this.expirationTime = tokenPayload.exp * 1000; // 轉換為毫秒
			
			// 判斷account身份為商家還是買家，進入主頁
			const nextPage =
				this.accountType === 'seller' ? 'SellerOverview' : 'UserProfile';
			router.push({ name: nextPage });

		},
    checkTokenExpiration() {
      if (this.expirationTime && Date.now() > this.expirationTime) {
				// 如果 token 已經過期，執行登出流程
        this.logout(true);
				alertStore.error('您已登出，請重新登入！')
      } else if (this.expirationTime) {
				// 如果 token 尚未過期，計算距離過期剩多少時間
        const timeout = this.expirationTime - Date.now();
				// 設定計時器，在 token 過期時自動登出
        setTimeout(() => {
          this.logout(true);
        }, timeout);
      }
    },
		async handleLoginError(error: any): Promise<void> {
			console.error('Login error:', error);
			let errorMessage = '登入失敗';
			if (error.response && error.response.status === 500) {
				errorMessage = '伺服器錯誤，請稍後再試;信箱不正確';
			} else if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				errorMessage = error.response.data.message;
			}
			alertStore.error(errorMessage);
		},
    logout(systemLogout: boolean = false): void {
      this.isLoggedIn = false;
      this.reset();
      localStorage.removeItem('auth');

			// 判斷是否為系統登出使用者
      if (systemLogout) {
        alertStore.error('登入已過期，請重新登入！');
      } else {
        alertStore.success('logOut');
      }

      // 返回登入畫面，判斷 account 身份為商家還是買家
      const nextPage = this.accountType === 'seller' ? 'SellerHome' : 'Index';
      router.push({ name: nextPage });
    },
		reset(): void {
			Object.assign(this, initialState());
		},
		cancel(): void {
			this.reset();
			alertStore.success('取消動作');
		},
		// 在啟動時調用檢查token是否過期
		initialize() {
			if (this.token !== '') {
				this.checkTokenExpiration();
			}
		}
	},
	persist: true,
});
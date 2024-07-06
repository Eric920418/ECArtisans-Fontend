import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type UserDataType } from '../type/userType';
import { userMenu, sellerMenu } from './menuStore';
import { useAuthStore } from '@/stores/index';
import {
	user,
	userEdit,
	userAuth,
	sellerAccount,
	sellerAccountEdit,
	sellerAuth,
	uploadImage,
} from './api';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		user: {} as UserDataType, // 初始信息
		sellerData: {} as UserDataType, // 初始商家信息
		imageError: 'images/user-img.svg',
		isLoading: false,
		accountType: '',
		updateStatus: false, //確認是否要傳送密碼修改
		addUserStatus: false, //會員註冊的狀態
		userMenu: userMenu,
		sellerMenu: sellerMenu,
	}),

	getters: {
		// hello: (state) => 'Hello!' + state.user.bossName,
	},
	// Methods
	actions: {
		async setAccountType(): Promise<void> {
			const currentPagePath = window.location.hash;
			if (currentPagePath.includes('/seller')) {
				this.accountType = 'seller';
			} else if (currentPagePath.includes('/user')) {
				this.accountType = 'user';
			}
		},
		// 取得資料
		async getUserAccount() {
			try {
				const authStore = useAuthStore();
				const token = authStore.token;
				const id = authStore.id;
				await this.setAccountType();
				let res;
				if (token && this.accountType === 'seller') {
					await sellerAccount(token)
						.then(res => {
							this.user = res.thisShop;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				} else if (id && this.accountType === 'user') {
					await user(id)
						.then(res => {
							this.user = res.data;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
				if (
					this.user.avatar === '' ||
					(this.user.avatar &&
						!this.user.avatar.includes('https://storage.googleapis.com'))
				) {
					this.user.avatar = this.imageError;
				}
			} catch (error) {
				alertStore.error('showError');
			}
		},
		// 更新資料
		async upUserAccount(pwData: object) {
			try {
				await this.setAccountType();
				let res;
				let updateData = {};
				const authStore = useAuthStore();
				const token = authStore.token;
				const id = authStore.id;
				let avatar;
				if (this.updateStatus === true && pwData) updateData = { ...pwData };
				if (this.user.avatar === this.imageError) avatar = '';
				else avatar = this.user.avatar;
				if (token && this.accountType === 'seller') {
					updateData = {
						...updateData,
						bossName: this.user.bossName,
						gender: this.user.gender,
						brand: this.user.brand,
						phone: this.user.phone,
						address: this.user.address,
						collection: this.user.collection,
						salesType: this.user.salesType,
						introduce: this.user.introduce,
						avatar: this.user.avatar,
					};
					await sellerAccountEdit(updateData, token)
						.then(res => {
							// console.log(res);
							alertStore.success('renewOK');
							// this.user = res.data;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				} else if (id && this.accountType === 'user') {
					updateData = {
						name: this.user.name,
						gender: this.user.gender,
						avatar: avatar,
						birthday: this.user.birthday,
						phone: this.user.phone,
						address: this.user.address,
						...updateData,
					};
					await userEdit(id, updateData)
						.then(res => {
							alertStore.success('renewOK');
							// this.user = res.data;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
				this.updateStatus = false;
			} catch (error) {
				alertStore.error('renewError');
			}
		},
		// 註冊/新增 會員
		async addUserAuth(data: any) {
			try {
				await this.setAccountType();
				let res;
				this.isLoading = true;

				if (this.accountType === 'seller') {
					await sellerAuth(data)
						.then(res => {
							// alertStore.success('registerOK');
							this.addUserStatus = true;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				} else if (this.accountType === 'user') {
					await userAuth(data)
						.then(res => {
							// alertStore.success('registerOK');
							this.addUserStatus = true;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
				}
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				alertStore.error('renewError');
			}
		},
		// 取得圖片
		async getImgUrl(data: any, token: string) {
			try {
				if (data && token && data !== null && token !== null) {
					this.isLoading = true;
					const formData = new FormData();
					formData.append('image', data);
					await uploadImage(formData, token)
						.then(res => {
							this.user.avatar = res.fileUrl;
						})
						.catch(err => {
							alertStore.error(err.response.data.message);
						});
					this.isLoading = false;
				} else {
					alertStore.error('找不到資料或登入過期');
				}
			} catch (error) {
				this.isLoading = false;
				alertStore.error('renewError');
			}
		},
	},
});

export default useUserStore;

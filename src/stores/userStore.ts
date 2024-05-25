import { defineStore } from 'pinia';
import { alertStore } from '@/main'; // 導入實例
import { type UserData } from '../type/userType';
import { type SellerData } from '../type/sellerType';
import {
	user,
	userEdit,
	userAuth,
	sellerAccount,
	sellerAccountEdit,
	sellerAuth,
} from './api';

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		user: {} as UserData, // 初始信息
		sellerData: {} as SellerData, // 初始商家信息
		imageError: 'images/user-img.svg',
		isLoading: false,
		accountType: '',
		updateStatus: false, //確認是否要傳送密碼修改
		addUserStatus: false, //會員註冊的狀態
		userMenu: [
			//會員頁面的目錄
			{
				title: '會員資訊',
				path: 'UserProfile',
			},
		],
		sellerMenu: [
			//商家頁面的目錄
			{
				title: '商家中心',
				path: 'SellerOverview',
			},
			{
				title: '商家資訊',
				path: 'SellerProfile',
			},
			/*
				{
					title: '活動管理',
					path: 'SellerActivity',
				},
				{
					title: '優惠劵',
					path: 'SellerCoupon',
				},
				{
					title: '業績分析',
					path: 'SellerPerformance',
				},
				{
					title: '訂單管理',
					path: 'SellerProduct',
				},
				{
					title: '聊聊',
					path: 'SellerMessage',
				},
			*/
		],
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
		async getUserAccount(id: string) {
			try {
				await this.setAccountType();
				let res;
				if (id && this.accountType === 'seller') {
					await sellerAccount(id)
						.then(res => {
							this.user = {
								name: res.thisShop.bossName,
								...res.thisShop,
							};
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
					(this.user.avatar && !this.user.avatar.includes('base64'))
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
				const id = this.user?._id;
				let avatar;

				if (this.updateStatus === true && pwData) updateData = { ...pwData };
				if (this.user.avatar === this.imageError) avatar = '';
				else avatar = this.user.avatar;
				if (id && this.accountType === 'seller') {
					updateData = {
						bossName: this.user.bossName,
						phone: this.user.phone,
						brand: this.user.brand,
						address: this.user.address,
						collection: this.user.collection,
						salesType: this.user.salesType,
						introduce: this.user.introduce,
						avatar: avatar,
						...updateData,
					};
					await sellerAccountEdit(id, updateData)
						.then(res => {
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
			} catch (error) {
				alertStore.error('renewError');
			}
		},
		// 註冊/新增 會員
		async addUserAuth(data: any) {
			// console.log(data);
			try {
				await this.setAccountType();
				let res;
				this.isLoading = true;
				if (this.accountType === 'seller') {
					await sellerAuth(data)
						.then(res => {
							// alertStore.success('registerOK');
							this.addUserStatus = true;
							console.log(res);
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
	},
});

export default useUserStore;

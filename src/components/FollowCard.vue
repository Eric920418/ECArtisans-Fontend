<template>
	<div v-if="item" class="card shadow-sm card-line h-100">
		<div class="position-absolute top-0 end-0 p-1 me-1 z-5">
			<!-- 開啟小鈴鐺?  -->
			<svg
				class="icon p-0 m-0"
				width="36"
				height="36"
				viewBox="-2 5 30 30"
				fill="none"
				@click="addToFollow(item._id)"
			>
				<!-- 背景↓ -->
				<!-- <rect width="36" height="36" rx="18" fill="#E4E9F2" /> -->
				<path
					class="farBell"
					v-if="!follow"
					d="M10.8643 20.5665L10.8633 20.5677L10.3936 21.1479C10.393 21.1488 10.3923 21.1496 10.3917 21.1504C9.96095 21.6786 9.87934 22.406 10.1773 23.0147C10.474 23.6207 11.0915 24 11.7612 24H15.0787C15.0787 24.7993 15.3989 25.5654 15.9708 26.1283C16.5421 26.6906 17.3128 27 18.1104 27C18.908 27 19.6787 26.6906 20.25 26.1283C20.8219 25.5654 21.1421 24.7993 21.1421 24H24.4596C25.1293 24 25.7468 23.6207 26.0435 23.0147C26.3417 22.4056 26.2597 21.6776 25.8282 21.1493C25.8279 21.1488 25.8275 21.1484 25.8272 21.1479L25.3574 20.5707C25.3571 20.5704 25.3569 20.5701 25.3567 20.5698C24.6012 19.6366 24.1898 18.4804 24.1898 17.2938V16.5C24.1898 13.8722 22.4817 11.6523 20.1196 10.8357C20.0352 9.79496 19.1553 9 18.1104 9C17.0655 9 16.1856 9.79496 16.1012 10.8357C13.7391 11.6523 12.031 13.8722 12.031 16.5V17.2938C12.031 18.481 11.6192 19.6369 10.8643 20.5665Z"
				/>
				<path
					class="fasBell"
					v-else
					d="M10.8643 20.5665L10.8633 20.5677L10.3936 21.1479C10.393 21.1488 10.3923 21.1496 10.3917 21.1504C9.96095 21.6786 9.87934 22.406 10.1773 23.0147C10.474 23.6207 11.0915 24 11.7612 24H15.0787C15.0787 24.7993 15.3989 25.5654 15.9708 26.1283C16.5421 26.6906 17.3128 27 18.1104 27C18.908 27 19.6787 26.6906 20.25 26.1283C20.8219 25.5654 21.1421 24.7993 21.1421 24H24.4596C25.1293 24 25.7468 23.6207 26.0435 23.0147C26.3417 22.4056 26.2597 21.6776 25.8282 21.1493C25.8279 21.1488 25.8275 21.1484 25.8272 21.1479L25.3574 20.5707C25.3571 20.5704 25.3569 20.5701 25.3567 20.5698C24.6012 19.6366 24.1898 18.4804 24.1898 17.2938V16.5C24.1898 13.8722 22.4817 11.6523 20.1196 10.8357C20.0352 9.79496 19.1553 9 18.1104 9C17.0655 9 16.1856 9.79496 16.1012 10.8357C13.7391 11.6523 12.031 13.8722 12.031 16.5V17.2938C12.031 18.481 11.6192 19.6369 10.8643 20.5665Z"
				/>
			</svg>
		</div>
		<div>
			<div class="card-top overflow-hidden">
				<img :src="item.avatar" class="img-eca" alt="..." />
			</div>
			<div class="m-0 row">
				<div class="py-2">
					<h3 class="title mb-1 p-0">{{ item.brand }}</h3>
				</div>
				<div class="m-1">
					<button
						class="btn btn-outline-primary w-100"
						@click="$go({ name: 'ShopHome', params: { id: item._id } })"
					>
						前往商店
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCollect, useAuthStore, go } from '@/stores/index';
import { alertStore } from '@/main';
import Star from './Star.vue';
import { type collectType } from '../type/collectType';
import Swal from 'sweetalert2';
const collect = useCollect();
const emit = defineEmits<{
	(event: 'remove', seller_id: string): void;
}>();
// 定義從父組件接收的props
const props = defineProps<{
	item: {
		_id: string;
		brand: string;
		avatar: string;
	};
}>();

const authStore = useAuthStore();
const isUser = computed(() => {
	return authStore.accountType === 'user';
});

const isLoggedIn = computed(() => {
	return authStore.isLoggedIn;
});

const follow = ref(true); // 預設為未收藏 -> 待補完整資料

const addToFollow = (seller_id: string) => {
	follow.value = !follow.value;
	if (follow.value) {
		collect.addFollow(seller_id);
	} else {
		collect.deleteFollow(seller_id);
		emit('remove', seller_id);
	}
};
</script>

<style lang="scss" scoped>
.card-top {
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	transition: all 1s ease-out; //效果滑順
	height: 120px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		height: 204px;
	}
}
.card-body {
	padding: 8px 8px 12px 8px !important;
	min-height: 176px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		padding: 12px 12px 12px 12px !important;
		min-height: 196px;
	}
}
.text-shop,
.title {
	display: -webkit-box;
	-webkit-line-clamp: 2; //超出兩行隱藏
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.text-shop {
	-webkit-line-clamp: 1; //超出兩行隱藏
}
.text-sold {
	flex-shrink: 0; //禁止擠壓
}

// 所有文字大小
.title {
	font-size: 1rem;
	font-weight: bold;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1.25rem;
	}
}

.text-card-shop {
	font-size: 0.75rem;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1rem;
	}
}
.text-card-price {
	font-size: 1.25rem;
	font-weight: bold;
	margin-bottom: 8px;
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 1.5rem;
	}
}
</style>

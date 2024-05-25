<template>
	<div class="container">
		<div class="row g-3 m-0 flex-grow-1">
			<div v-if="route.name !== 'SellerHome'" class="col-md-2 py-5">
				<ul class="list-group">
					<router-link
						v-for="(menuItem, menuIndex) in menu"
						:key="menuIndex"
						:to="{ name: menuItem.path }"
						class="list-group-item"
						:class="{ active: menuItem.path === route.name }"
						:aria-current="menuItem.path === route.name"
					>
						{{ menuItem.title }}
					</router-link>
				</ul>
			</div>
			<!-- 右側 -->
			<router-view class="col-md-10 py-5"></router-view>
			<!-- 右側 -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore, useUserStore } from '@/stores/index';

const route = useRoute();

let menu = ref([]) as any;

onMounted(() => {
	// 根據當前路由加載資料
	if (route.path.startsWith('/seller')) {
		const userStore = useUserStore();
		menu.value = userStore.sellerMenu;
	} else if (route.path.startsWith('/user')) {
		const userStore = useUserStore();
		menu.value = userStore.userMenu;
	}
});
</script>

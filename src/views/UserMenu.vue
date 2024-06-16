<template>
	<div class="container p-0">
		<div class="row g-3 m-0 p-0 flex-grow-1">
			<div
				v-if="route.name !== 'SellerHome'"
				class="d-none d-lg-block col-lg-2 p-0 m-0"
			>
				<ul class="list-group userMenu mt-5">
					<router-link
						v-for="(menuItem, menuIndex) in menu"
						:key="menuIndex"
						:to="menuItem.path"
						class="list-group-item btn btn-Bg rounded-2 text-start p-3"
						:class="{
							'btn-Bg-active': isRouteName(route.name, menuItem.path.name),
						}"
						:aria-current="isRouteName(route.name, menuItem.path.name)"
					>
						{{ menuItem.title }}
					</router-link>
				</ul>
			</div>
			<!-- 右側 -->
			<router-view class="col p-0 mt-5"></router-view>
			<!-- 右側 -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore, useUserStore } from '@/stores/index';

const route = useRoute();
const userStore = useUserStore();
function isRouteName(routeName: any, menuItemName: string) {
	if (typeof routeName === 'string' && typeof menuItemName === 'string') {
		return routeName.split('er')[1]?.includes(menuItemName.split('er')[1]);
	}
	return false;
}
const menu = ref([]) as any;
const getData = () => {
	if (route.matched[0].path === '/seller') {
		menu.value = userStore.sellerMenu;
	} else if (route.matched[0].path === '/user') {
		menu.value = userStore.userMenu;
	}
};
onMounted(() => {
	getData();
});
</script>
<style lang="scss" scoped>
.userMenu {
	// max-width: 196px;
	padding: 16px;
	background-color: #fff;
}
</style>

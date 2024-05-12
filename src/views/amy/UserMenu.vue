<template>
	<div class="isClose container">
		<div class="row g-3 m-5">
			<div
				v-if="route.currentRoute.value.name !== 'SellerHome'"
				class="col-md-2"
			>
				<ul class="list-group">
					<router-link
						v-for="(menu, menuIndex) in userMenu"
						:key="menuIndex"
						:to="{ name: menu.path }"
						class="list-group-item"
						:class="{ active: menu.path === route.currentRoute.value.name }"
						:aria-current="menu.path === route.currentRoute.value.name"
					>
						{{ menu.title }}
					</router-link>
				</ul>
			</div>
			<!-- 右側 -->
			<router-view></router-view>
			<!-- 右側 -->
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/index';

const route = useRouter();

const userStore = useUserStore();
const userMenu = userStore.userMenu;
</script>

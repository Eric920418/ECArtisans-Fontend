<template>
	<div class="isClose container">
		<div class="row g-3 m-5">
			<div class="col-md-2">
				<ul class="list-group">
					<router-link
						v-for="(menu, menuIndex) in sellerMenu"
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
import { ref, defineEmits, onMounted, provide, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
const route = useRouter();
import { useSellerStore } from '@/stores/index';

const sellerStore = useSellerStore();
const sellerMenu = sellerStore.sellerMenu;
</script>

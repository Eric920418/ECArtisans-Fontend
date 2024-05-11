<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a class="navbar-brand" href="#"><Logo /></a>
			<router-link
				:to="{ name: 'SellerProfile' }"
				v-if="authStore.isLoggedIn"
				class="navbar-brand"
			>
				<span>｜商家管理中心</span>
			</router-link>
			<router-link :to="{ name: 'SellerOverview' }" v-else class="navbar-brand">
				<span></span>
			</router-link>
			<p>isLoggedIn: {{ authStore.isLoggedIn }}</p>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarScroll"
				aria-controls="navbarScroll"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div
				class="collapse navbar-collapse justify-content-end"
				id="navbarScroll"
			>
				<div class="row gx-2">
					<div class="col navbar-buttons d-flex align-items-center">
						<div v-if="authStore.isLoggedIn" class="mx-2">
							<div class="mx-2 dropdown">
								<!-- 判斷是否登入，未登入則跳轉至登入頁面 -->
								<button
									class="btn btn-primary rounded-circle dropdown-menu-end"
									type="button"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									data-display="static"
								>
									<i class="bi bi-person-circle"></i>
								</button>
								<ul
									class="dropdown-menu dropdown-menu-lg-end"
									aria-labelledby="dropdownMenuButton"
								>
									<li>
										<router-link
											:to="{ name: 'SellerProfile' }"
											class="dropdown-item"
										>
											商家中心
										</router-link>
									</li>
									<li><a class="dropdown-item" @click="ShopLogout">登出</a></li>
								</ul>
							</div>
						</div>
						<div v-else class="mx-2">
							<button
								type="button"
								class="btn btn-primary"
								@click="SellerLogin"
							>
								登入
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
// import useUserStore from '@/stores/authStore';

import Logo from './Logo.vue';
const authStore = useAuthStore();
// const UserStore = useUserStore();
const router = useRouter();

function SellerLogin() {
	router.push({ name: 'SellerLogin' });
}

async function ShopLogout() {
	authStore.logout();
}

// if (UserStore.isLoggedIn) {
// 	SellerProfile();
// }
</script>

<style scoped>
.search-size {
	width: 400px;
}
</style>

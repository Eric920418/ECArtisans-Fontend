<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<a v-if="isLoggedIn" class="navbar-brand" @click="ShopManage">
				<span>Navbar scroll｜商家管理中心</span>
			</a>
			<a v-else="isLoggedIn" class="navbar-brand" @click="ShopHome">
				<span>Navbar scroll</span>
			</a>
			<p>isLoggedIn: {{ isLoggedIn }}</p>
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
						<div v-if="isLoggedIn" class="mx-2">
							<div class="mx-2 dropdown">
								<!-- 判斷是否登入，未登入則跳轉至登入頁面 -->
								<button
									v-if="isLoggedIn"
									class="btn btn-primary rounded-circle"
									type="button"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i class="bi bi-person-circle"></i>
								</button>
								<a
									v-else
									@click="toLogin"
									class="btn btn-primary rounded-circle"
								>
									<i class="bi bi-person-circle"></i>
								</a>
								<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<li><a class="dropdown-item" href="#">會員中心</a></li>
									<li><a class="dropdown-item" @click="ShopLogout">登出</a></li>
								</ul>
							</div>
						</div>
						<div v-else="isLoggedIn" class="mx-2">
							<button type="button" class="btn btn-primary" @click="ShopLogin">
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
import { defineProps } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const isLoggedIn = authStore.isLoggedIn;

// 紀錄是否為已登入，應該要以pinia管理

const router = useRouter();

function ShopLogin() {
	router.push('./loginShop');
}

function ShopHome() {
	router.push('./ShopHome');
}

function ShopManage() {
	router.push('./ShopManage');
}

function ShopLogout() {
	authStore.logout();
	router.push('./ShopHome');
}
</script>
<style scoped>
.search-size {
	width: 400px;
}
</style>

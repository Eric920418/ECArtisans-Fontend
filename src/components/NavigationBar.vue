<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
		<div class="container-fluid">
			<router-link to="/" class="nav-link"><Logo /></router-link>
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
				class="collapse navbar-collapse justify-content-between"
				id="navbarScroll"
			>
				<ul class="navbar-nav mb-2 mb-lg-0">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Link</a>
					</li>
					<li class="nav-item dropdown">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarScrollingDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							Link
						</a>
						<ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
							<li><a class="dropdown-item" href="#">Action</a></li>
							<li><a class="dropdown-item" href="#">Another action</a></li>
							<li><hr class="dropdown-divider" /></li>
							<li><a class="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
				</ul>

				<div class="row gx-2">
					<form class="col d-flex align-items-center">
						<div class="input-group search-size">
							<input
								class="form-control"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<select
								class="form-select"
								aria-label="Default select example"
								style="width: 50px"
							>
								<option selected value="1">找商品</option>
								<option value="2">找賣家</option>
							</select>
							<button class="btn btn-primary" type="submit">
								<i class="bi bi-search"></i>
							</button>
						</div>
					</form>
					<div class="col navbar-buttons d-flex align-items-center">
						<div v-if="authStore.isLoggedIn" class="mx-2">
							<router-link :to="{ name: 'ShopHome' }" class="btn btn-link">
								<i class="bi bi-shop-window"></i>
								<span>我要開店</span>
							</router-link>
						</div>
						<div v-else class="mx-2">
							<router-link :to="{ name: 'ShopLogin' }" class="btn btn-link">
								<i class="bi bi-shop-window"></i>
								<span>我要開店</span>
							</router-link>
						</div>
						<div class="mx-2 dropdown">
							<!-- 判斷是否登入，未登入則跳轉至登入頁面 -->
							<template v-if="authStore.isLoggedIn">
								<button
									class="btn btn-primary rounded-circle"
									type="button"
									id="dropdownMenuButton"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									<i class="bi bi-person-circle"></i>
								</button>
								<ul
									class="dropdown-menu dropdown-menu-lg-end"
									aria-labelledby="dropdownMenuButton"
								>
									<li><a class="dropdown-item" href="#">會員中心</a></li>
									<li><a class="dropdown-item" @click="toLogout">登出</a></li>
								</ul>
							</template>
							<template v-else>
								<a @click="toLogin" class="btn btn-primary rounded-circle">
									<i class="bi bi-person-circle"></i>
								</a>
							</template>
						</div>
						<div class="mx-2 dropdown">
							<button
								class="btn btn-primary rounded-circle"
								type="button"
								id="dropdownMenuButton"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<i class="bi bi-suit-heart"></i>
							</button>
							<ul
								class="dropdown-menu dropdown-menu-lg-end"
								aria-labelledby="dropdownMenuButton"
							>
								<li><a class="dropdown-item" href="#">收藏商品</a></li>
								<li><a class="dropdown-item" href="#">關注賣家</a></li>
							</ul>
						</div>
						<div class="mx-2 position-relative">
							<button class="btn btn-primary rounded-circle">
								<i class="bi bi-bag"></i>
								<span
									class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger rounded-circle"
								>
									99+
									<span class="visually-hidden">purchase car list</span>
								</span>
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
import Logo from './Logo.vue';
const authStore = useAuthStore();

const router = useRouter();

function toLogin() {
	router.push('./UserLogin');
}

function toShopHome() {
	router.push('./ShopHome');
}

async function toLogout() {
	await authStore.logout(); // 等待登出操作完成
	router.push('./');
}
</script>

<style scoped>
.search-size {
	width: 400px;
}
</style>

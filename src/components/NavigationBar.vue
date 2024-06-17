<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-white">
		<div class="container">
			<router-link to="/" class="nav-link">
				<h1 class="mb-0 me-3 d-flex align-items-center">
					<img
						src="/images/ECArtisans.svg"
						class="logo"
						alt="ECArtisans"
						title="ECArtisans"
					/>
				</h1>
			</router-link>
			<p>isLoggedIn: {{ authStore.isLoggedIn }}</p>
			<div class="position-relative d-flex">
				<button
					class="me-2 navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<!-- <button class="btn btn-primary rounded-circle">
					<i class="bi bi-bag"></i>
					<span
						class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger rounded-circle"
					>
						99+
						<span class="visually-hidden">purchase car list</span>
					</span>
				</button> -->
			</div>

			<div
				class="collapse navbar-collapse justify-content-between"
				id="navbarScroll"
			>
				<ul class="navbar-nav mb-2 mb-lg-0">
					<li class="nav-item dropdown">
						<button type="button" class="btn btn-primary" @click="sellerlogin">
							臨時的商家登入點
						</button>
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
							商品總覽
						</a>
						<div class="dropdown-menu md-menu">
							<ol class="" aria-labelledby="navbarScrollingDropdown">
								<li v-for="(menu, menuIndex) in menulist" :key="menuIndex">
									<a class="dropdown-item overflow-y-hidden" href="#">
										{{ menu }}
										<div class="dot"></div>
									</a>
								</li>
							</ol>
						</div>
					</li>
				</ul>

				<div class="row gx-2">
					<form class="col d-flex">
						<input
							class="form-control"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<!-- <select
								class="form-select"
								aria-label="Default select example"
								style="width: 50px"
							>
								<option selected value="1">找商品</option>
								<option value="2">找商家</option>
							</select> -->
						<button class="btn btn-primary" type="submit">
							<i class="bi bi-search"></i>
						</button>
					</form>
					<div class="col navbar-buttons d-flex align-items-center">
						<router-link :to="{ name: 'SellerHome' }" class="btn btn-link">
							<i class="bi bi-shop-window"></i>
							<span>我要開店</span>
						</router-link>
						<div class="mx-2 dropdown">
							<!-- 判斷是否登入，未登入則跳轉至登入頁面 -->
							<div
								v-if="
									authStore.isLoggedIn && authStore.accountType === 'seller'
								"
								class="mx-2"
							>
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
										<li @click="shopLogout">
											<a class="dropdown-item">登出</a>
										</li>
									</ul>
								</div>
							</div>

							<!-- <template
								v-if="authStore.isLoggedIn && authStore.accountType === 'user'"
							>
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
									<li>
										<router-link
											class="dropdown-item"
											:to="{ name: 'UserProfile' }"
										>
											會員中心
										</router-link>
									</li>
									<li><a class="dropdown-item" @click="toLogout">登出</a></li>
								</ul>
							</template>
							<template v-else>
								<a @click="toLogin" class="btn btn-primary rounded-circle">
									<i class="bi bi-person-circle"></i>
								</a>
							</template> -->
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
								<li><a class="dropdown-item" href="#">關注商家</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index';
import Logo from './Logo.vue';

const authStore = useAuthStore();

const router = useRouter();
const menulist = [
	'娛樂',
	'服飾',
	'3C產品',
	'食品',
	'家具',
	'運動',
	'寵物',
	'生活用品',
	'清潔用品',
	'其他',
];
function sellerlogin() {
	router.push({ name: 'SellerLogin' });
}

function toLogin() {
	router.push({ name: 'UserLogin' });
}

function toSellerHome() {
	router.push({ name: 'SellerHome' });
}
async function shopLogout() {
	authStore.logout();
}

function toLogout() {
	console.log('執行');
	// authStore.logout(); // 等待登出操作完成
}
// const isShopRoute = ref(false);

// watchEffect(() => {
// 	isShopRoute.value = route.path.toLowerCase().startsWith('/seller');
// });
</script>

<style scoped>
.search-size {
	width: 400px;
}
</style>

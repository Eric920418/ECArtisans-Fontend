<template>
	<nav class="navbar navbar-expand-xl navbar-light bg-white">
		<div
			class="container"
			:class="{
				'navbar-min-size': resize < 1200,
				container: resize >= 1200,
			}"
		>
			<router-link to="/" class="nav-link">
				<h1 class="ms-3 ms-xl-0 mb-0 me-3 d-flex align-items-center">
					<img
						src="/images/ECArtisans.svg"
						class="logo"
						alt="ECArtisans"
						title="ECArtisans"
					/>
				</h1>
			</router-link>
			<button
				v-if="route.name === 'SellerHome' && isUser === 'seller' && !isLoggedIn"
				class="btn btn-primary px-xxl-4"
				type="button"
				@click="$go({ name: 'SellerLogin' })"
			>
				申請/登入商家
			</button>
			<div v-if="!isSellerRoute" class="position-relative d-flex btn-group">
				<button
					class="me-2 navbar-toggler collapsed d-flex d-xl-none flex-column justify-content-around"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarScroll"
					aria-controls="navbarScroll"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<button
					v-if="resize < 1200"
					class="btn btn-primary rounded-circle me-4"
				>
					<i class="bi bi-bag"></i>
					<span
						class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger rounded-circle"
					>
						99+
						<span class="visually-hidden">purchase car list</span>
					</span>
				</button>
			</div>

			<div
				v-if="!isSellerRoute"
				class="collapse navbar-collapse d-xl-flex justify-content-xl-between navbar-menu bg-white p-0 w-100"
				id="navbarScroll"
			>
				<div
					class="py-4 py-xl-2 px-3 pe-xl-0 w-100"
					:style="{
						height: resize < 1200 ? ' calc(100vh - 56px)' : 'fit-content',
						'overflow-y': resize < 1200 ? 'auto' : 'visible',
					}"
				>
					<div
						:class="{
							'row flex-column flex-nowrap ': resize < 1200,
							'd-flex justify-content-between w-100 p-0': resize >= 1200,
						}"
					>
						<div
							:class="{
								'col-12 order-2': resize < 1200,
								'd-flex align-items-center justify-content-center':
									resize >= 1200,
							}"
							class=""
						>
							<ul
								:class="{
									'row m-0 p-0': resize < 1200,
									'navbar-nav mb-2 mb-lg-0': resize >= 1200,
								}"
								style="list-style: none"
							>
								<li
									:class="{
										'col-12 my-3 fs-3 m-0 p-0': resize < 1200,
										'nav-item dropdown': resize >= 1200,
									}"
									style="list-style: none"
								>
									<button
										:class="{
											'nav-link mb-3 mb-lg-0 px-2': resize < 1200,
											'nav-link dropdown-toggle fs-6': resize >= 1200,
										}"
										id="navbarScrollingDropdown"
										role="button"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										商品總覽
									</button>
									<div
										:class="{
											'col-12 m-0 p-0': resize < 1200,
											'dropdown-menu md-menu': resize >= 1200,
										}"
									>
										<ol
											:class="{ 'row m-0 p-0 ': resize < 1200 }"
											aria-labelledby="navbarScrollingDropdown"
										>
											<li
												v-for="(menu, menuIndex) in menulist"
												:key="menuIndex"
												style="list-style: none"
												:class="{ 'col-6 col-sm-3 m-0 p-2': resize < 1200 }"
											>
												<a
													:class="{
														'btn btn-Bg rounded-2 text-center w-100 h-100 py-2':
															resize < 1200,
														'dropdown-item overflow-y-hidden': resize >= 1200,
													}"
													href="#"
												>
													{{ menu }}
													<div v-if="resize >= 1200" class="dot"></div>
												</a>
											</li>
										</ol>
									</div>
								</li>
							</ul>
						</div>
						<!-- 搜尋框  搜尋框 --------------------------- -->
						<div
							:class="{
								'col-12 order-1 mb-3': resize < 1200,
								'd-flex align-items-center justify-content-center':
									resize >= 1200,
							}"
						>
							<div
								class="d-flex align-items-center justify-content-center me-3 nav-search"
							>
								<input
									id="search"
									name="請輸入名稱"
									type="search"
									class="form-control nav-search-input"
									aria-label="優惠卷名稱"
									placeholder="請輸入名稱..."
								/>
								<div class="btn-group">
									<div class="dropdown-center">
										<button
											class="btn nav-btn-search dropdown-toggle d-flex align-items-center justify-content-center"
											type="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<div class="line flex-shrink">
												{{ searchText }}
											</div>
										</button>
										<ul class="dropdown-menu menu-search text-center">
											<li
												v-for="(searchType, searchTypeIndex) in searchlist"
												:key="searchTypeIndex"
												@click="getSearchText(searchType)"
											>
												<div class="dropdown-item">
													{{ searchType }}
												</div>
											</li>
										</ul>
									</div>
								</div>
								<button
									class="btn btn-primary btn-search d-flex align-items-center justify-content-center"
									type="button"
									@click="onSubmit1"
									style="width: 36px; height: 36px"
								>
									<font-awesome-icon :icon="['fas', 'magnifying-glass']" />
								</button>
							</div>
						</div>

						<!-- 其他 按鈕 --------------------------- -->

						<div
							:class="{
								'col-12 order-3': resize < 1200,
								'd-flex align-items-center justify-content-center px-2 m-0':
									resize >= 1200,
							}"
						>
							<div
								:class="{
									'row m-0 ': resize < 1200,
									'd-flex align-items-center justify-content-center':
										resize >= 1200,
								}"
							>
								<button
									@click="
										isUser === 'seller' && isLoggedIn
											? $go({ name: 'SellerProfile' })
											: $go({ name: 'SellerHome' })
									"
									class="btn text-primary flex-shrink"
									:class="{
										'col-12 py-4 px-0 text-start': resize < 1200,
									}"
								>
									<i class="bi bi-shop-window"></i>
									<span>
										{{
											isUser === 'seller' && isLoggedIn
												? '前往商店'
												: '我要開店'
										}}
									</span>
								</button>

								<button
									@click="
										isUser === 'user' && isLoggedIn
											? $go({ name: 'UserProfile' })
											: $go({ name: 'UserLogin' })
									"
									class="btn text-primary flex-shrink"
									:class="{
										'col-12 py-4 px-0 text-start': resize < 1200,
									}"
								>
									<i class="bi bi-person"></i>
									會員中心
								</button>

								<div
									class="btn-group flex-shrink"
									:class="{
										'col-12 px-0': resize < 1200,
									}"
								>
									<div
										class=""
										:class="{
											'nav-item w-100': resize < 1200,
											dropdown: resize >= 1200,
										}"
									>
										<button
											class="btn text-primary m-0 p-0 text-start"
											:class="{
												'py-4 w-100': resize < 1200,
											}"
											type="button"
											id="dropdownMenuButton"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<i class="bi bi-heart"></i>
											收藏
										</button>
										<ul
											v-if="resize >= 1200"
											class="dropdown-menu dropdown-menu-lg-st"
											aria-labelledby="dropdownMenuButton"
										>
											<li><a class="dropdown-item" href="#">收藏商品</a></li>
											<li><a class="dropdown-item" href="#">關注商家</a></li>
										</ul>
									</div>
								</div>

								<button
									v-if="resize >= 1200"
									class="ms-2 btn btn-primary rounded-circle position-relative"
								>
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
		</div>
	</nav>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/index';
import Logo from './Logo.vue';
import { useResize } from '@/stores/index';
const { resize } = useResize();

const authStore = useAuthStore();

const route = useRoute();
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

const searchlist = ['找商品', '找商家'];
const searchText = ref('找商品');

function onSubmit1() {
	// 送出搜尋選單
}
function getSearchText(value: string) {
	searchText.value = value;
}

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
const isUser = computed(() => {
	return authStore.accountType;
});
const isLoggedIn = computed(() => {
	return authStore.isLoggedIn;
});
const isSellerRoute = computed(() => {
	return route.matched.length > 0 && route.matched[0].path.includes('/seller');
});

onMounted(() => {
	// 根據當前路由加載資料
	if (route && route.name === 'SellerProfile') {
		// init.value = sellerTitleData;
	} else if (route && route.name === 'UserProfile') {
		// init.value = userTitleData;
	}
	// userStore.getUserAccount(id);
});
</script>

<style scoped>
.search-size {
	/* width: 400px; */
}
</style>

<template>
	<div class="bg-primary">
		<div class="container">
			<footer
				class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-12 pt-5 pt-sm-45 border-top-0 white"
			>
				<div class="col col-md-4 col-lg-4 mb-45">
					<router-link
						to="/"
						class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none"
					>
						<!-- <svg class="bi me-2" width="40" height="32">
							<use xlink:href="#bootstrap"></use>
						</svg> -->
						<h3 class="white">
							<span class="fw-bolder">EC</span>
							<span class="fw-light spacing">Artisans</span>
						</h3>
					</router-link>
					<p class="text-body-secondary white mb-sm-2">
						copyright © 2024 ECArtisans
					</p>
					<p class="text-body-secondary white mb-sm-2">
						110 台北市信義區崧鹿路 28 號
					</p>
					<p class="text-body-secondary white mb-sm-0">ECArtisans@gmail.com</p>
				</div>

				<div class="col offset-md-3 col-md-3 col-lg-4 offset-lg-2 mb-2">
					<h5 class="mb-4">商品總覽</h5>
					<ul class="nav row">
						<li
							v-for="(item, index) in menulist"
							:key="index"
							class="nav-item mb-3 col-6 col-md-4"
						>
							<p
								class="nav-link p-0 text-body-secondary white"
								@click="
									$go({
										name: 'ProductOverview',
										query: { category: item, page: 1 },
									})
								"
							>
								{{ item }}
							</p>
						</li>
					</ul>
				</div>

				<div class="col col-md-2 mb-3">
					<h5 class="mb-3">關於我們</h5>
					<ul class="nav flex-column">
						<li class="nav-item mb-2">
							<a href="#" class="nav-link p-0 text-body-secondary white">Q&A</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	</div>
</template>
<script setup lang="ts">
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
</script>
<style scoped>
.spacing {
	letter-spacing: 0.1rem;
}
</style>

<template>
	<OneColumnLayout>
		<template #main>
			<div>
				<div
					v-if="state === 'login'"
					class="container d-flex justify-content-center align-items-center px-0"
					style="margin-top: 200px"
				>
					<div class="row">
						<div class="col-8 p-0">
							<div class="position-relative">
								<h1
									class="z-3 position-absolute display-3 fw-bold"
									style="bottom: 350px; left: -50px"
								>
									ECArtisans
								</h1>
								<h3
									class="z-3 position-absolute fw-bold"
									style="bottom: 300px; left: -50px"
								>
									探索無限購物樂趣
								</h3>
								<div class="box"></div>
							</div>
						</div>
						<div class="col-4 my-auto">
							<div class="fs-3 fw-bold">登入</div>
							<shopLogin class="mt-3" @Sigin="handleClick"></shopLogin>
						</div>
					</div>
				</div>
				<div
					v-else-if="state === 'sigin'"
					class="container vh-100 d-flex justify-content-center align-items-center"
				>
					<shopSigup @goback="handleClick2"></shopSigup>
				</div>
			</div>
		</template>
	</OneColumnLayout>
</template>
<script setup>
import { ref, watch } from 'vue';
import OneColumnLayout from '../../layouts/OneColumnLayout.vue';
import shopLogin from '/src/components/eric/shopLogin.vue';
import shopSigup from '/src/components/eric/shopSigup.vue';

// 使用 ref 創建 reactive 狀態
const state = ref('login');

// 點擊事件處理函數
const handleClick = data => {
	console.log(`data.message: ${data.message}`);
	state.value = data.message;
};

const handleClick2 = () => {
	state.value = 'login';
};

// 確認有沒有收到signin
watch(state, (newValue, oldValue) => {
	console.log('State changed: ', newValue);
});
</script>

<style scoped>
.box {
	width: 600px;
	height: 400px;
	background-color: #d1c4c4;
}
</style>

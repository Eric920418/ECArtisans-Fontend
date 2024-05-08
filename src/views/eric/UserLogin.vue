<template>
	<div class="container">
		<div class="row g-3 py-4 justify-content-center">
			<div
				class="col-12 col-md-6 col-lg-7 col-xl-8 d-flex pt-4 ps-5 pe-4 px-md-4 m-4 mt-md-6 justify-content-center align-items-center"
			>
				<div class="card box w-100 h-100">
					<div class="position-relativ" style="height: 50vh">
						<div
							class="position-absolute"
							style="transform: translate(-13.5%, -30%)"
						>
							<h2 class="z-3 fw-bold display-3">ECArtisans</h2>
							<h3 class="z-3 fw-bold">探索無限購物樂趣</h3>
						</div>
					</div>
				</div>
			</div>
			<div
				class="col-12 col-md-5 col-lg-4 col-xl-3 d-flex align-items-center px-4 px-md-0"
			>
				<div>
					<div class="fs-3 fw-bold">會員登入</div>
					<userLogin class="mt-3" @Sigin="handleClick"></userLogin>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import userLogin from '/src/components/eric/userLogin.vue';

export default {
	components: {
		userLogin,
	},
	data() {
		return {
			state: 'login',
		};
	},
	methods: {
		handleClick() {
			this.state = 'sigin';
		},
		handleClick2() {
			this.state = 'login';
		},
	},
};
</script>

<style scoped>
.box {
	/* width: 600px;
	height: 400px; */
	background-color: #d1c4c4;
}
</style>

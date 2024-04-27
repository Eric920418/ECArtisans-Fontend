<template>
	<OneColumnLayout>
		<template v-slot:main>
			<div>
				<div
					v-if="state === 'login'"
					class="container vh-100 d-flex justify-content-center align-items-center"
				>
					<shopLogin @Sigin="handleClick"></shopLogin>
				</div>
				<div
					v-else-if="state === 'sigin'"
					class="container vh-100 d-flex justify-content-center align-items-center"
				>
					<shopSigup></shopSigup>
				</div>
			</div>
		</template>
	</OneColumnLayout>
</template>

<script>
import shopLogin from '/src/components/eric/shopLogin.vue';
import shopSigup from '/src/components/eric/shopSigup.vue';
import OneColumnLayout from '../../layouts/OneColumnLayout.vue';

export default {
	components: {
		shopLogin,
		shopSigup,
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
	},
};
</script>

<style scoped></style>

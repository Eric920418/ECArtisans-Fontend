<template>
	<div class="container">
		<div aria-live="polite" aria-atomic="true" class="fixed-bottom">
			<div
				class="toast-container position-absolute p-3 bottom-0 start-50 translate-middle-x"
				id="toast-container"
				style="z-index: 9"
			>
				<!-- 以下重複 -->
				<div v-for="(toast, index) in toasts" :key="index" class="mb-2">
					<div
						v-if="toast.type === 'toast'"
						class="toast toast-info align-items-center text-white bg-dark border-0 opacity-75 z-5"
						:class="{ show: toast.show }"
						role="alert"
						aria-live="assertive"
						aria-atomic="true"
					>
						<div class="d-flex">
							<div class="toast-body h6 p-3 m-0 d-flex">
								<font-awesome-icon
									v-if="toast.icon"
									:icon="['fas', toast.icon]"
									class="me-2"
								/>
								{{ toast.message }}
							</div>
							<button
								type="button"
								class="btn-close btn-close-white me-2 me-3 m-auto"
								data-bs-dismiss="toast"
								aria-label="Close"
								@click="remove(toast.timestamp)"
							></button>
						</div>
					</div>

					<div
						v-if="toast.type === 'error'"
						class="toast toast-info align-items-center text-danger-emphasis bg-danger-subtle border-0 opacity-75"
						:class="{ show: toast.show }"
						role="alert"
						aria-live="assertive"
						aria-atomic="true"
					>
						<div class="d-flex">
							<div class="toast-body h6 p-3 m-0 d-flex">
								<font-awesome-icon
									:icon="['fas', 'circle-exclamation']"
									class="me-2"
								/>
								{{ toast.message }}
							</div>
							<button
								type="button"
								class="btn-close text-danger-emphasis me-2 me-3 m-auto"
								data-bs-dismiss="toast"
								aria-label="Close"
								@click="remove(toast.timestamp)"
							></button>
						</div>
					</div>
				</div>

				<!-- 以下重複 -->
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAlertStore } from '@/stores/index';
const alertStore = useAlertStore();
const toasts = computed(() => alertStore.toasts);

function remove(index: number) {
	alertStore.removeToast(index);
}
</script>

<style scoped>
/* .bg-dark {
	background-color: #00000050 !important;
	opacity: ;
} */
</style>

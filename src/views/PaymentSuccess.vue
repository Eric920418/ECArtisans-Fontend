<template>
	<div class="container">
		<div class="row px-3 m-0 justify-content-center align-items-center">
			<div class="col-8 my-3">
				<div class="position-relative m-4">
					<div
						class="progress"
						role="progressbar"
						aria-label="Progress"
						aria-valuenow="100"
						aria-valuemin="0"
						aria-valuemax="100"
						style="height: 1px"
					>
						<div class="progress-bar" style="width: 100%"></div>
					</div>
					<button
						type="button"
						class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						1
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						2
					</button>
					<button
						type="button"
						class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-primary rounded-circle"
						style="width: 2rem; height: 2rem"
					>
						3
					</button>
				</div>
			</div>
		</div>
		<div class="row g-3 py-4 d-flex justify-content-center mt-3 my-7">
			<div class="col-12 my-3 text-center">
				<div class="fs-3 fw-bold">註冊完成</div>
			</div>
			<div class="col-12 text-center">
				<font-awesome-icon
					:icon="['fas', 'circle-check']"
					class="opacity-25 text-primary mb-2"
					style="font-size: 6.5em"
				/>
				<p>你已經完成註冊</p>
			</div>

			<div class="col-12 text-center">
				<button class="btn btn-primary px-5">合約方案</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// 想要改變文字，如果可以進行傳送的話
</script>

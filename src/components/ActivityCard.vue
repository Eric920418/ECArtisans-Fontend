<template>
	<div class="card card-hover" @click="data.go ? $go(data.go) : ''">
		<div class="row m-0 p-0">
			<div v-if="data.img" class="productCard-img-100 p-0">
				<img :src="`${data.img}`" class="img-eca" />
			</div>
			<div class="col p-0 m-0">
				<div class="border-bottom pb-1 mb-1 d-flex align-items-center">
					<h3
						class="card-title fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
					>
						{{ data.title }}
					</h3>

					<div>
						<p
							v-if="data.state"
							class="text-enable neutral-02 mb-0 text-nowrap"
						>
							{{ data.state ? '啟用中' : '停止' }}
						</p>
					</div>
				</div>

				<div class="d-flex" v-if="data.type !== undefined || data.id">
					<!-- 如果數字 0 會當 false -->
					<p
						v-if="data.type !== undefined && data.type !== null"
						class="text-card-coupon btn-Bg-active rounded-1 text-primary mb-0 me-2"
					>
						{{
							data.percentage && data.type === 0
								? getCoupon(data.type, data.percentage)
								: getCoupon(data.type)
						}}
					</p>
					<p v-if="data.id" class="mb-0 mt-1 text-no neutral-02">
						編號：{{ data.id }}
					</p>
				</div>
				<p v-if="data.date" class="text-date mb-0 mt-1">
					有效日期： {{ data.date.sDate ? $getDate(data.date.sDate) : '' }}
					<span v-if="data.date.sDate && data.date.eDate">~</span>
					{{ data.date.eDate ? $getDate(data.date.eDate) : '' }}
				</p>
				<div v-if="data.btn" class="d-flex p-0 d-flex justify-content-end mt-2">
					<button
						v-for="(btnItme, btnIndex) in data.btn"
						:key="btnIndex"
						class="btn btn-outline-primary px-4 flex-shrink"
						:class="{ 'me-2': btnIndex + 1 !== data.btn.length }"
						@click="btnItme.go ? $go(btnItme.go) : ''"
					>
						{{ btnItme.title }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// import { getDate } from '@/stores/index';
import router from '@/router';
import { getCoupon } from '@/stores/index';
import { type ActivityCardType } from '@/type/ActivityCardType';

const props = defineProps<{
	data: ActivityCardType;
}>();
</script>

<style lang="scss" scoped>
.text-enable {
	padding: 2px 0px;
	flex-shrink: 0 !important; //禁止擠壓
	font-size: 0.75rem; //12
	@media (min-width: 768px) {
		//依照 Breakpoints md以上 高度是 204px
		font-size: 0.875rem; //14
	}
}
.text-no {
	font-size: 0.75em;
}
.text-date {
	font-size: 0.875em;
}
.card-title {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.productCard-img-100 {
	width: 8rem;
	height: 8rem;
	margin-right: 12px;
}
</style>

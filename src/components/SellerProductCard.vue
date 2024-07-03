<template>
	<div class="card card-hover mb-4">
		<div class="row m-0 p-0">
			<div class="productCard-img-100 p-0 position-relative">
				<div
					class="imgLength bg-secondary d-flex justify-content-center align-items-center position-absolute bottom-0 end-0 m-2"
				>
					{{ data.image.length }}
				</div>
				<img :src="`${data.image[0]}`" class="img-eca" />
			</div>
			<div class="col p-0 m-0 pe-3">
				<div class="border-bottom pb-1 mb-1 d-flex align-items-center">
					<h3
						class="card-title fs-5 m-0 neutral-01 p-0 me-2 flex-grow-1 card-text-hover"
					>
						{{ data.productName }}
					</h3>
					<div class="d-flex">
						<div class="neutral-02" style="width: 4.75em">啟用狀態</div>
						{{ data.isOnshelf ? '上架' : '下架' }}
					</div>
				</div>
				<div>
					<div class="d-flex mb-1 justify-content-between">
						<div class="d-flex">
							<div
								v-if="data.origin !== ''"
								class="text-card-coupon btn-Bg-active rounded-1 me-3"
							>
								{{ data.origin }}
							</div>
							<div class="text-card-coupon btn-Bg-active rounded-1 me-3">
								{{ data.sellerCategory }}
							</div>
							<div
								v-for="(categoryItme, categoryIndex) in data.category"
								:key="categoryIndex"
								class="text-card-coupon btn-Bg-active rounded-1 me-3"
							>
								{{ categoryItme }}
							</div>
						</div>
						<div class="d-flex mb-1">
							<div class="neutral-02" style="width: 4.75em">出售數量</div>
							{{ data.sold }}
						</div>
					</div>
					<div class="d-flex mb-1">
						<div class="neutral-02" style="width: 3em">編號</div>
						{{ data._id }}
					</div>
					<div class="d-flex justify-content-between align-items-center">
						<div class="d-flex flex-wrap">
							<div class="d-flex me-5">
								<div class="pt-2" style="width: 2.75em">成本</div>
								<div class="fs-2 fw-bold">{{ data.format[0].cost }}</div>
							</div>
							<div class="d-flex me-5">
								<div class="pt-2" style="width: 2.75em">毛利</div>
								<div class="fs-2 fw-bold">
									{{
										parseInt(data.format[0].price) -
										parseInt(data.format[0].cost)
									}}
								</div>
							</div>
							<div class="d-flex me-5">
								<div class="pt-2" style="width: 2.75em">售價</div>
								<div class="fs-2 fw-bold">{{ data.format[0].price }}</div>
							</div>
							<div class="d-flex me-5">
								<div class="pt-2" style="width: 2.75em">庫存</div>
								<div class="fs-2 fw-bold">{{ data.format[0].stock }}</div>
							</div>
						</div>
						<div class="d-flex justify-content-center align-items-center m-0">
							<div
								class="btn btn-outline-primary px-4 flex-shrink"
								@click="
									$go({ name: 'SellerProductCheck', params: { id: data._id } })
								"
							>
								查看商品詳情
							</div>
						</div>
					</div>
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
	data: any;
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
.imgLength {
	width: 20px;
	height: 20px;
	font-size: 12px;
	border-radius: 50%;
}
</style>

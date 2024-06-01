<template>
	<div class="d-flex align-items-center">
		<!-- me-2 用後面撐開間距會比較好，如果有遇到 RWD 前面才不會無法對齊 -->
		<p class="mb-0 me-2">
			{{ stars.toFixed(1) }}
		</p>
		<!-- 改這樣是，因為 ul 應該是要清單文字，但這裡應該只是個圖片 -->
		<div class="d-flex align-items-center">
			<!-- 滿 -->
			<div
				class="d-flex align-items-center"
				v-for="(star, starIndex) in filledStars"
				:key="'filled-' + starIndex"
			>
				<img :src="starIcon" alt="Filled Star" class="icon-star" />
			</div>
			<!-- 半顆 -->
			<div class="d-flex align-items-center" v-if="halfStar()">
				<img :src="halfStarIcon" alt="Half Star" class="icon-star" />
			</div>
			<!-- 空 -->
			<div
				class="d-flex align-items-center"
				v-for="(star, starIndex) in emptyStars()"
				:key="'emptied-' + starIndex"
			>
				<img :src="emptyStarIcon" alt="Emptied Star" class="icon-star" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import starIcon from '@/assets/icons/iconStar.svg';
import emptyStarIcon from '@/assets/icons/iconStarOutline.svg';
import halfStarIcon from '@/assets/icons/iconStarHalf.svg';

// 定義從父組件接收的props
const props = defineProps<{
	stars: number;
}>();

// const filledStars = Math.floor(props.stars);
// const emptyStars = 5 - filledStars; // 計算空星數量

const filledStars = Math.floor(props.stars);

// 半顆 0.5 ~ 0.9 之間算是半顆
const halfStar = () => {
	const decimalPart = props.stars - Math.floor(props.stars);
	return decimalPart >= 0.5 && decimalPart < 1;
};

const emptyStars = () => {
	let half = 0;
	if (halfStar()) {
		half = 1;
	}
	return 5 - half - filledStars;
};
</script>
<style lang="scss" scoped>
.icon-star {
	width: 16px;
	height: 16px;
	padding: calc((16px - 12.67px) / 2) calc((16px - 13.35px) / 2);
	margin: 2px;
}
</style>

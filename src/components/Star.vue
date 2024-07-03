<template>
	<div class="d-flex align-items-center">
		<!-- me-2 用後面撐開間距會比較好，如果有遇到 RWD 前面才不會無法對齊 -->
		<p class="mb-0 me-2">
			{{ (stars !== null ? stars : 0).toFixed(1) }}
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
			<div class="d-flex align-items-center" v-if="isHalfStar">
				<img :src="halfStarIcon" alt="Half Star" class="icon-star" />
			</div>
			<!-- 空 -->
			<div
				class="d-flex align-items-center"
				v-for="(star, starIndex) in emptyStars"
				:key="'emptied-' + starIndex"
			>
				<img :src="emptyStarIcon" alt="Emptied Star" class="icon-star" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import starIcon from '@/assets/icons/iconStar.svg';
import emptyStarIcon from '@/assets/icons/iconStarOutline.svg';
import halfStarIcon from '@/assets/icons/iconStarHalf.svg';

// 定義從父組件接收的props
const props = defineProps<{
	stars: number | null;
}>();

// const filledStars = Math.floor(props.stars);
// const emptyStars = 5 - filledStars; // 計算空星數量

// const filledStars = computed(() => Math.floor(props.stars));
const filledStars = computed(() => {
	let stars = props.stars;

	// 在這裡進行需要的轉換或處理
	if (stars === null) {
		stars = 0;
	} else {
		// 例如，如果要將 string 轉換為 number，可以使用以下方式
		stars = Number(stars);
		// 或者其他類型的轉換，例如 parseFloat 等等
	}

	return Math.floor(stars);
});
// 半顆 0.5 ~ 0.9 之間算是半顆
const isHalfStar = computed(() => {
	let stars = props.stars;
	// 在這裡進行需要的轉換或處理
	if (stars === null) {
		stars = 0;
	} else {
		// 例如，如果要將 string 轉換為 number，可以使用以下方式
		stars = Number(stars);
		// 或者其他類型的轉換，例如 parseFloat 等等
	}
	const decimalPart = stars - filledStars.value;
	return decimalPart >= 0.5 && decimalPart < 1;
});

const emptyStars = computed(() => {
	let half = 0;
	if (isHalfStar.value) {
		half = 1;
	}
	return 5 - filledStars.value - half;
});
</script>
<style lang="scss" scoped>
.icon-star {
	width: 16px;
	height: 16px;
	padding: calc((16px - 12.67px) / 2) calc((16px - 13.35px) / 2);
	margin: 2px;
}
</style>

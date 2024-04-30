<template>
	<v-row v-if="isVisible" class="msg-flex p-3">
		<div class="msg_text">
			<div class="msg_icon">
				<div v-if="message === 1">11n</div>
				<div v-if="message === 2 || message === 3">22on</div>
				<div v-if="message === 4 || message === 5">333on</div>
			</div>
			<h5 class="mb-0 mx-2">{{ getMessage(message) }}</h5>
		</div>
		<button type="button" class="btn-close p-2" @click="closeMsg"></button>
	</v-row>
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted, onUnmounted } from 'vue';

// 回傳 emit 傳出去的資料
const emit = defineEmits(['close']); // 定义事件

// 接收 props 傳進來的資料
const props = defineProps<{
	message: number; // 消息内容
}>();

// 使用 props 中的 message
const message = props.message; // 将属性存入变量，方便使用

// 依照 message 修改值
function getMessage(message: number) {
	switch (message) {
		case 1:
			return '已取得優惠劵';
		case 2:
			return '商家已加入關注';
		case 3:
			return '已取消關注商家';
		case 4:
			return '商品已加入收藏';
		case 5:
			return '已取消收藏商品';
		default:
			return '系統發生錯誤';
	}
}

const isVisible = ref(true); // 初始可见性

// 关闭消息的方法
const closeMsg = () => {
	isVisible.value = false;
	emit('close'); // 触发关闭事件
};

// 自动关闭定时器
onMounted(() => {
	const timeout = setTimeout(closeMsg, 3000); // 3000 = 3秒
	onUnmounted(() => clearTimeout(timeout)); // 组件卸载时清除定时器
});
</script>

<style scoped>
/* 固定在畫面下方的樣式 SEATR */
.msg-flex {
	position: fixed;
	bottom: 5vh;
	left: 50%;
	transform: translateX(-50%);
	max-width: calc(150px + 7.5em);
	height: 4.5em;
	background-color: lightgray;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.msg_text {
	display: flex;
	justify-content: center;
	align-items: center;
}
.msg_icon {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3em;
	height: 3em;
	background-color: cadetblue;
}

/* 固定在畫面下方的樣式 END */
</style>

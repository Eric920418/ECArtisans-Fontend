import { ref, computed, onMounted, onUnmounted } from 'vue';

export function useResize() {
	const resizeFont = ref('');
	const isLess500 = ref(false);
	const isBigger500 = ref(false);

	const windowWidth = ref(window.innerWidth);

	const resize = computed(() => windowWidth.value);

	const handleResize = () => {
		windowWidth.value = window.innerWidth;
		if (windowWidth.value < 500) {
			resizeFont.value = 'less than 500px';
			isLess500.value = true;
			isBigger500.value = false;
		} else {
			resizeFont.value = 'greater than 500px';
			isBigger500.value = true;
			isLess500.value = false;
		}
	};

	onMounted(() => {
		window.addEventListener('resize', handleResize);
		handleResize(); // Initial call to set the correct values
	});

	onUnmounted(() => {
		window.removeEventListener('resize', handleResize);
	});

	return {
		// resizeFont,
		// isLess500,
		// isBigger500,
		resize,
	};
}

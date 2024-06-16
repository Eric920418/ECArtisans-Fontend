// vue-shims.d.ts
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		$go: (path: string | Object) => any;
		$title: (text: string) => any;
		$getDate: (date: string | null) => string | void;
	}
}

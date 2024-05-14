<template>
	<div>
		<h1>首頁</h1>
		<button class="btn btn-primary">primary Button</button>
		<button class="btn btn-secondary">secondary Button</button>
		<button class="btn btn-success">success Button</button>
		<button class="btn btn-info">info Button</button>
		<button class="btn btn-danger">danger Button</button>
		<button class="btn btn-light">light Button</button>
		<button class="btn btn-dark">dark Button</button>
		<button class="btn btn-neutral01">neutral01 Button</button>
		<button class="btn btn-neutral02">neutral02 Button</button>
		<button class="btn btn-neutral03">neutral03 Button</button>
		<button class="btn btn-neutral04">neutral04 Button</button>
		<button class="btn btn-neutral05">neutral05 Button</button>
		<dir class="row m-2 p-2">
			<router-link class="col-4 card-line" to="/">RRR123</router-link>
			<router-link class="col-4 card-line" to="/">RRR123</router-link>
		</dir>

		<font-awesome-icon :icon="['fas', 'triangle-exclamation']" class="me-2" />
	</div>
</template>

<script lang="ts" setup></script>

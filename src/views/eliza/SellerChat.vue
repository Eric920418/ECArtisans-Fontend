<template>
	<div>聊天室</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { io } from 'socket.io-client';

let socket;

onMounted(() => {
	const URL = 'https://ecartisans-backend.onrender.com/';
	socket = io(URL, {
		transports: ['websocket'],
	});

	socket.on('connect', () => {
		console.log('Connected to server');
	});

	socket.on('message', data => {
		console.log('Received message:', data);
	});
});
</script>

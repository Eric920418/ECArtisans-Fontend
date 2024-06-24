<template>
	<div>
		<div class="chat-container">
			<div v-if="chatStatus.connect">
				<p>已連接到伺服器</p>
			</div>
			<div v-else>
				<p>未連接到伺服器</p>
			</div>
			<ul class="messages">
				<li v-for="(msg, index) in messages" :key="index">
					{{ msg.user }}: {{ msg.message }}
				</li>
			</ul>
			<input v-model="chatStatus.user" placeholder="輸入您的名字" />
			<input v-model="message.content" placeholder="輸入消息" />
			<button @click="sendMessage">發送消息</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import io from 'socket.io-client';

interface Message {
	user: string;
	message: string;
}

const socket = ref<any>(null);
const chatStatus = reactive({
	user: '',
	connect: false,
});
const message = reactive({
	content: '',
});
const messages = reactive<Message[]>([]);

onMounted(() => {
	const URL = 'https://ecartisans-backend.onrender.com/';
	socket.value = io(URL, { transports: ['websocket'] });

	socket.value.on('connect', () => {
		chatStatus.connect = true;
	});

	socket.value.on('disconnect', () => {
		chatStatus.connect = false;
	});

	socket.value.on('message', (msg: Message) => {
		messages.push(msg);
	});
});

onUnmounted(() => {
	if (socket.value) socket.value.disconnect();
});

function sendMessage() {
	if (chatStatus.user && message.content) {
		socket.value.emit('message', {
			user: chatStatus.user,
			message: message.content,
		});
		message.content = '';
	}
}
</script>

<style scoped>
.chat-container {
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 10px;
}

.messages {
	list-style: none;
	padding: 0;
	margin: 10px 0;
}

.messages li {
	padding: 5px 0;
	border-bottom: 1px solid #eee;
}

input {
	display: block;
	width: 100%;
	padding: 10px;
	margin-bottom: 10px;
	box-sizing: border-box;
}

button {
	padding: 10px 20px;
	background-color: #14b2be;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
}

button:hover {
	background-color: #14b2be;
}
</style>

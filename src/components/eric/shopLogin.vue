<template>
    <div class="login">
        <input class="d-flex mx-auto form-control mb-2" type="text" placeholder="郵件">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="密碼">
        <button class="btn btn-primary mt-2 me-2" @click="login">登入</button>
        <button class="btn btn-primary mt-2" >註冊</button>
        
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';

const login = () => {
    console.log('login');
    axios.post('http://127.0.0.1:3005/auth/shopLogin', { mail: 'text@gmail.com', password: '12345678' })
    .then(res => { console.log(res); })
    .catch(err => { console.log(err); });
}
</script>

<style scoped>
.login{
    width: 500px;
}
</style>

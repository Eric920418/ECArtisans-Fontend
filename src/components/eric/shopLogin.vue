<template>
    <div class="login">
        <input class="d-flex mx-auto form-control mb-2" type="text" placeholder="郵件" v-model="mail">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="密碼" v-model="password">
        <button class="btn btn-primary mt-2 me-2" @click="login">登入</button>
        <button class="btn btn-primary mt-2"  @click="change">註冊</button>     
    </div>
</template>


<script>
export default {
    data() {
        return {
            mail:"" ,
            password:""
        }
    },

    methods: {
        login() {
            this.$axios.post('/auth/shop-login', { mail: this.mail, password: this.password })
            .then( res => { console.log(res); })
            this.mail = "";
            this.password = "";
        },
        change() {
            this.$emit('sigin');
        }
    },
}
</script>

<style scoped>
.login{
    width: 500px;
}
</style>

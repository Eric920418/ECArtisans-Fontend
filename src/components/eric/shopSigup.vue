<template>
    <div class="login">
        <input class="d-flex mx-auto form-control mb-2" type="text" placeholder="名稱" v-model="bossName">
        <select class="form-select" aria-label="Default select example" v-model="gender">
            <option value="男">男</option>
            <option value="女">女</option>
        </select>
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="手機" v-model="phone">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="郵件" v-model="mail">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="賣場名稱" v-model="brand">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="頭貼" v-model="avatar">
        <input class="d-flex mx-auto form-control mt-2" type="password" placeholder="密碼" v-model="password">
        <input class="d-flex mx-auto form-control mt-2" type="password" placeholder="確認密碼" v-model="confirmPassword">
        <input class="d-flex mx-auto form-control mt-2" type="text" placeholder="地址" v-model="address">
      
        <button class="btn btn-primary mt-2" @click="sigup">註冊</button>     
    </div>
</template>

<script>
export default {
    data(){
        return{
            bossName: "",
            gender: "男",
            phone: "",
            mail: "",
            brand: "",
            avatar: "",
            password: "",
            confirmPassword: "",
            address: ""
        }
    },

    methods:{
        sigup(){
            this.$axios.post('/auth/shop-signUp', {
                bossName: this.bossName,
                gender: "男",
                phone: this.phone,
                mail: this.mail,
                brand: this.brand,
                avatar: this.avatar,
                password: this.password,
                confirmPassword: this.confirmPassword,
                address: this.address
            })
            .then( res => { console.log(res); 

            })

        }


    }
}
</script>
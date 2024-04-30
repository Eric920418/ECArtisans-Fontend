<template>
    <div class="login" style="width: 600px;">
        <div class=" fs-3 fw-bold d-flex justify-content-center mb-3">立即註冊</div>
        <div class="d-flex justify-content-center">
            <div class=" fw-bold d-flex  mb-3">已經有帳號了?</div>
            <a class="  ms-2" @click.prevent="goback">返回</a>   
        </div>
        <div class="row">
            <div class="col-6">
                <div class="d-flex">
                    <label for="name" class=" text-nowrap my-auto me-2">*姓名</label>
                    <input class="d-flex mx-auto form-control my-auto" id="name" type="text" placeholder="名稱" v-model="bossName">
                </div>
                <div class="d-flex mt-1">
                    <label for="password" class=" text-nowrap my-auto me-2">*密碼</label>
                    <input class="d-flex mx-auto form-control my-auto" id="password" type="password" placeholder="密碼" v-model="password">
                </div>
            </div>
            <div class="col-6">
                <div class="d-flex">
                    <label for="gender" class=" text-nowrap my-auto me-2">*性別</label>
                    <select class="form-select my-auto" id="gender" aria-label="Default select example" v-model="gender">
                        <option selected>請選擇</option>
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </div>
                <div class="d-flex mt-1">
                    <label for="confirmPassword" class=" text-nowrap my-auto me-2">*確認密碼</label>
                    <input class="d-flex mx-auto form-control my-auto" id="confirmPassword" type="password" placeholder="確認密碼" v-model="confirmPassword">
                </div>
            </div>
        </div>
        <div class="d-flex mt-1">
            <label for="brand" class=" text-nowrap my-auto " style="width: 90px;">*賣場名稱</label>
            <input class="d-flex mx-auto form-control my-auto" id="brand" type="text" placeholder="賣場名稱" v-model="brand">
        </div>
        <div class="d-flex mt-1">
            <label for="phone" class=" text-nowrap my-auto " style="width: 90px;">*手機</label>
            <input class="d-flex mx-auto form-control my-auto" id="phone" type="text" placeholder="手機" v-model="phone">
        </div>
        <div class="d-flex mt-1">
            <label for="mail" class=" text-nowrap my-auto " style="width: 90px;">*郵件</label>
            <input class="d-flex mx-auto form-control my-auto" id="mail" type="text" placeholder="郵件" v-model="mail">
        </div>
        <div class="d-flex mt-1">
            <label for="avatar" class=" text-nowrap my-auto " style="width: 90px;">頭貼</label>
            <input class="d-flex mx-auto form-control my-auto" type="avatar" placeholder="頭貼" v-model="avatar">
        </div>
        <div class="d-flex mt-1">
            <label for="address" class=" text-nowrap my-auto " style="width: 90px;">實體地址</label>
            <input class="d-flex mx-auto form-control mt-2" id="address" type="text" placeholder="地址" v-model="address">
        </div>
        <div class="d-flex justify-content-center my-2">
            <input type="checkbox">點擊註冊, 即表示您同意我們的<a class="" @click.prevent="">隱私權政策</a>
        </div>
        <div class="d-flex justify-content-center">
            <button class=" btn btn-primary mt-2 w-50" @click="sigup">註冊</button>     
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            bossName: "",
            gender: "請選擇",
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
            this.$axios.post('', {
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
        },
        goback(){
            this.$emit('goback');
        }

    }
}
</script>
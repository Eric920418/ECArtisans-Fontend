<template>
    <form @submit.prevent="submit"
          class="vl-parent"
          ref="formContainer">
        <!-- your form inputs goes here-->
        <label><input type="checkbox" v-model="fullPage">Full page?</label>
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
    import {ref, inject} from 'vue'
    import {useLoading} from 'vue-loading-overlay'
    
    const $loading = useLoading({
        // options
    });
    // or use inject without importing useLoading
    // const $loading =  inject('$loading')

    const fullPage = ref(false)

    const submit = () => {
        const loader = $loading.show({
            // Optional parameters
        });
        // simulate AJAX
        setTimeout(() => {
            loader.hide()
        }, 5000)
    }
</script>
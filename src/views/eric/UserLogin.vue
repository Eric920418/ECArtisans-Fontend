<template>
<<<<<<< HEAD
<div>
    <div v-if="state === 'login'" class="container vh-100 d-flex justify-content-center align-items-center">
    <shopLogin  @Sigin='handleClick'></shopLogin>
    </div>
    <div v-else-if="state === 'sigin'" class="container vh-100 d-flex justify-content-center align-items-center">
    <shopSigup></shopSigup>
    </div>
</div>
</template>


<script>
import shopLogin from '/src/components/eric/shopLogin.vue'
import shopSigup from '/src/components/eric/shopSigup.vue'

export default {
    components: {
        shopLogin,
        shopSigup
    },
    data() {
        return {
            state: 'login'

        }
    },
    methods: {
        handleClick(){
            this.state = 'sigin'
        }
    }

}
</script>


<style scoped>

</style>
=======
	<div
		class="container vh-100 d-flex justify-content-center align-items-center"
	>
		<shopLogin></shopLogin>
	</div>
</template>

<script setup lang="ts">
import shopLogin from '../../components/eric/shopLogin.vue';
</script>

<style scoped></style>
>>>>>>> 7f200b32c5dcc59c7f331b9b374c72021a12018a

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type RandomUser, fetchRandomUser } from '../api/RandomUser';

const loading = ref(true);
const randomUser = ref<RandomUser | null>(null);

onMounted(async () => {
  try {
    randomUser.value = await fetchRandomUser();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <div v-if="randomUser" class="card" style="width: 16rem;">
      <img :src="randomUser.picture.medium" class="card-img-top" :alt="`${randomUser.name.first} ${randomUser.name.last}`" />
      <div class="card-body">
        <h5 class="card-title">{{ randomUser.name.first }} {{ randomUser.name.last }}</h5>
        <p class="card-text">Country: {{ randomUser.location.country }}</p>
        <p class="card-text">State: {{ randomUser.location.state }}</p>
        <p class="card-text">City: {{ randomUser.location.city }}</p>
        <a :href="'mailto:' + randomUser.email" class="btn btn-primary">Send Email</a>
      </div>
    </div>
</template>

<style scoped>

</style>

<template>
  <main>
    <h1>Telas Emanuel</h1>
    <h3>Productos más vendidos</h3>
    <div class="container mx-auto p-4" @click="verProd()">
      <Carrusel :slides="slides" v-if="slides.length > 0" />
      <p v-else>Cargando productos...</p>
    </div>
    <router-link to="/categories">
      Ver categorías
    </router-link>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Carrusel from '../components/Carrusel.vue';

const router = useRouter();
const slides = ref([]);

const fetchRandomProducts = async () => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_TELASEMANUEL + '/random-products/');
    slides.value = response.data.map(product => product.url);
  } catch (error) {
    console.error("Error fetching random products:", error);
  }
}

function verProd() {
  router.push("");
}

onMounted(fetchRandomProducts);
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 3em;
}
</style>

<template>
  <main>
    <ModalCart />
    <h1>Telas Emanuel</h1>
      <div id="marco">
      <div id="logo">
        <h1 style="color: #000;">LONAS Y VINILES</h1>
        <h1 style="color: #000;">TELAS PARA TAPICERIA Y MAS...</h1>
      </div>
    </div>
    <h3>Productos más vendidos</h3>
    <div class="container mx-auto p-4" @click="verProd">
      <Carrusel :slides="slides.map(slide => slide.url)" v-if="slides.length > 0" />
      <p v-else>Cargando productos...</p>
    </div>
    <div v-if="isLoading" class="loading-container">
      <img src="../images/loading.gif" alt="Cargando" class="loading-gif"/>
      <p>Cargando...</p>
    </div>
    <div v-else>
      <h3>Productos por categoría</h3>
      <div class="categories flex flex-wrap sm:block">
        <CategoryCard v-for="category in categories" :key="category.name" :category="category" @select-category="selectCategory" />
      </div>      
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Carrusel from '../components/Carrusel.vue';
import CategoryCard from '../components/CategoryCard.vue';
import ModalCart from '../components/ModalCart.vue';

const router = useRouter();
const slides = ref([]);
const categories = ref([]);
const isLoading = ref(true);

const fetchRandomProducts = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_TELASEMANUEL}/random-products/`);

    slides.value = response.data.map(product => {
      return {
        url: product.url,
        category: product.categoryName,
        name: product.name
      };
    });
  } catch (error) {
    console.error("Error fetching random products:", error);
  }
}

const verProd = () => {
  if (slides.value.length > 0) {
    const { category, name } = slides.value[0];  // Assuming you want to redirect to the first product

    if (category && name) {
      const categoryEncoded = encodeURIComponent(category);
      const nameEncoded = encodeURIComponent(name);
      router.push(`/categories/${categoryEncoded}/${nameEncoded}`);
    } else {
      console.error("Category or name is undefined");
    }
  } else {
    console.error("Slides array is empty");
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_TELASEMANUEL}/categories/`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    isLoading.value = false;
  }
}

const selectCategory = (categoryName) => {
  router.push('/categories/' + categoryName);
}

onMounted(async () => {
  await fetchRandomProducts();
  await fetchCategories();
});
</script>

<style scoped>
a {
  text-decoration: none;
  font-size: 3em;
}

.categories {
  display: flex;
  flex-wrap: wrap;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.loading-gif {
  width: 500px;
  height: 450px;
}

#logo{
  background-image: url("/public/WhatsApp Image 2024-07-11 at 1.37.56 PM.jpeg");
  height: 80vh;
  width: 80vh;
  background-size: cover;
  /*text-align: center;
  display: flex;
  align-items: center;*/
}  

#marco{
  text-align:center;
  display: flex;
  align-items: center;
  heigth:200vh; 
  width: 150vh;
  padding-left: 80vh;
}

@media (max-width: 640px) {
  .categories {
    display: block;
  }
}
</style>

<template>
    <ModalCart />
    <div>
      <h1>Estas son las categorias de nuestros productos</h1>
      <div v-if="isLoading" class="loading-container">
        <img src="../images/loading.gif" alt="Cargando" class="loading-gif"/>
        <p>Cargando...</p>
      </div>
      <div v-else class="categories">
        <CategoryCard v-for="category in categories" :key="category.name" :category="category"
            @select-category="selectCategory" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import CategoryCard from '../components/CategoryCard.vue';
  import { useRouter } from 'vue-router';
  import ModalCart from '../components/ModalCart.vue';
  
  const categories = ref([]);
  const isLoading = ref(true);
  const router = useRouter();
  
  async function fetchCategories() {
      isLoading.value = true;
      try {
          const response = await axios.get(import.meta.env.VITE_API_TELASEMANUEL + '/categories/');
          categories.value = response.data;
      } catch (error) {
          console.error('Error fetching categories:', error);
      } finally {
          isLoading.value = false;
      }
  }
  
  function selectCategory(categoryName) {
      router.push('/categories/' + categoryName);
  }
  
  onMounted(fetchCategories);
  </script>
  
  <style scoped>
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
  </style>
  
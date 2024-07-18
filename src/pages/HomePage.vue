<template>
  <header>
    <img src="../images/logo.jpeg" id="nombre" alt="Telas Emanuel logo" title="Telas Emanuel tienda en línea">
    <img src="../images/pecesito.png" id="pez">
  </header>
  <main>
    <ModalCart @cartUpdated="handleCartUpdated" />
    <div id="logo">
      <h1 style="color: #000;">LONAS Y VINILES</h1>
      <h1 style="color: #000;">TELAS PARA TAPICERIA Y MAS...</h1>
    </div>
    <h3>Productos más vendidos</h3>
    <div class="container mx-auto p-4">
      <Carrusel :slides="slides" v-if="slides.length > 0" @select-slide="verProd" />
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
    slides.value = response.data.map(product => ({
      url: product.url,
      category: product.categoryName,
      name: product.name
    }));
  } catch (error) {
    console.error("Error fetching random products:", error);
  }
};

const verProd = (index) => {
  const slide = slides.value[index];
  if (slide && slide.category && slide.name) {
    const categoryEncoded = encodeURIComponent(slide.category);
    const nameEncoded = encodeURIComponent(slide.name);
    router.push(`/categories/${categoryEncoded}/${nameEncoded}`);
  } else {
    console.error("Category or name is undefined");
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_TELASEMANUEL}/categories/`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  } finally {
    isLoading.value = false;
  }
};

const selectCategory = (categoryName) => {
  router.push('/categories/' + categoryName);
};

const handleCartUpdated = () => {
  console.log('Cart has been updated');
};

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("/WhatsApp Image 2024-07-11 at 1.37.56 PM.jpeg");
  background-size: cover;
  width: 100vh; /* Ajusta el ancho */
  height: 100vh; /* Ajusta la altura */
  text-align: center;
  margin: 0 auto; /* Centra horizontalmente */
}  

/*header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}*/

#pez{
  width: 16vh;
  height: 8vh;
}

@media (max-width: 640px) {
  .categories {
    display: block;
  }
  
  header {
    flex-direction: column;
    align-items: center;
  }

  #logo {
    width: 100%; /* Ocupa todo el ancho de la pantalla */
    height: auto; /* Ajusta la altura automáticamente */
    margin: 0; /* Elimina el margen */
  }

  #pez, #nombre {
    width: 50%;
    height: auto;
  }

  #pez {
    width: 50px; /* Ajusta el tamaño para pantallas pequeñas */
    height: auto;
  }
}
</style>

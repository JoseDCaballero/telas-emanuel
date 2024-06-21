<template>
    <div>
        <h1>{{ categoryName }}</h1>
        <div v-if="isLoading" class="loading-container">
            <img src="../images/loading.gif" alt="Cargando" class="loading-gif" />
            <p>Cargando...</p>
        </div>
        <ProductList v-else :products="products" />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ProductList from '../components/ProductList.vue';

const route = useRoute();
const categoryName = ref(route.params.categoryName);
const products = ref([]);
const isLoading = ref(true);

async function fetchProducts() {
    isLoading.value = true;
    try {
        const response = await axios.get(import.meta.env.VITE_API_TELASEMANUEL + `/products/`, {
            params: { categoryName: categoryName.value }
        });
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        isLoading.value = false;
    }
}

watch(() => route.params.categoryName, (newCategoryName) => {
    categoryName.value = newCategoryName;
    fetchProducts();
});

onMounted(fetchProducts);
</script>

<style>
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
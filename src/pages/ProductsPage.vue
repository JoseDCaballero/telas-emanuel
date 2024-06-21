<template>
    <div>
        <h1>{{ categoryName }}</h1>
        <ProductList :products="products" />
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

async function fetchProducts() {
    try {
        const response = await axios.get(import.meta.env.VITE_API_TELASEMANUEL+`/products/`, {
            params: { categoryName: categoryName.value }
        });
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

watch(() => route.params.categoryName, (newCategoryName) => {
    categoryName.value = newCategoryName;
    fetchProducts();
});

onMounted(fetchProducts);
</script>
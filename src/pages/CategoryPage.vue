<template>
    <div>
        <h1>Estas son las categorias de nuestros productos</h1>
        <div class="categories">
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

const categories = ref([]);
const router = useRouter();

async function fetchCategories() {
    try {
        const response = await axios.get(import.meta.env.VITE_API_TELASEMANUEL+'/categories/');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function selectCategory(categoryName) {
    router.push('/categories/'+ categoryName );
}

onMounted(fetchCategories);
</script>

<style scoped>
.categories {
    display: flex;
    flex-wrap: wrap;
}
</style>
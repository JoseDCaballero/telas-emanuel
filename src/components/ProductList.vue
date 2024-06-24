<template>    
    <div class="product-list">
        <div v-for="product in products" :key="product.name" class="product-card" @click="redirectToOrder(product)">
            <img :src="product.url" alt="Product Image" />            
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
    products: Array,
    categoryName: String // Asegúrate de que categoryName es pasado como prop
});

const router = useRouter();

function redirectToOrder(product) {
    router.push({ name: 'OrderPage', params: { categoryName: props.categoryName, product: product.name } });
}
</script>

<style scoped>
.product-list {
    display: flex;
    flex-wrap: wrap;
}

.product-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    text-align: center;
    width: 200px;
    cursor: pointer;
}

.product-card img {
    max-width: 100%;
    height: auto;
}

.product-card button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>

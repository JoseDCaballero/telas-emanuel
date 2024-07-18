<template>    
    <div class="product-list">
        <div v-for="product in products" :key="product.name" class="product-card" @click="redirectToOrder(product)">
            <img :src="product.url" alt="Product Image" />
        </div>
    </div>
</template>

<script setup>
//import ModalCart from '../components/ModalCart.vue';
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
    gap: 30px;
    /* Espacio entre tarjetas */
    justify-content: center;
    /* Centrar tarjetas horizontalmente */
}

.product-card {
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px;
    /* Espacio alrededor de cada tarjeta */
    text-align: center;
    width: 200px;
    /* Ancho de la tarjeta */
    cursor: pointer;
}

.product-card img {
    max-width: 100%;
    height: auto;
}
</style>

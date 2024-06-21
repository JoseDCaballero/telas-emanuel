<template>
    <div class="product-list">
        <div v-for="product in products" :key="product.name" class="product-card">
            <img :src="product.url" alt="Product Image" />
            <h3>{{ product.name }}</h3>
            <p> Precio: ${{ product.price }}</p>
            <p v-if="product.categoryName=='Cierres'">*Incluye 2 seguros*</p>
            <button @click="anadir()">Agregar a cuenta</button>
        </div>
    </div>
</template>

<script setup>
//import { defineProps } from 'vue';

const props = defineProps({
    products: Array
});

function anadir(){
    alert("Artículo añadido")
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
}

.product-card img {
    max-width: 100%;
    height: auto;
}
</style>
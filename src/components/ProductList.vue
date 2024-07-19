<template>
    <div class="product-list">
        <div v-if="highlightedProduct" class="product-card first-product" @click="redirectToOrder(highlightedProduct)">
            <img :src="highlightedProduct.url" alt="Product Image" />
        </div>
        <div class="remaining-products">
            <div v-for="(product, index) in products" :key="product.name" class="small-product"
                @click="highlightProduct(product)">
                <img :src="product.url" alt="Product Image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    products: Array,
    categoryName: String // Asegúrate de que categoryName es pasado como prop
});

const router = useRouter();
const highlightedProduct = ref(props.products[0]);

function highlightProduct(product) {
    highlightedProduct.value = product;
}

function redirectToOrder(product) {
    router.push({ name: 'OrderPage', params: { categoryName: props.categoryName, product: product.name } });
}
</script>

<style scoped>
.product-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 10px auto; /* Centra el contenedor de productos en la página */
    text-align: center;
    cursor: pointer;
    width: 35vh;
}

.first-product {
    display: flex;
    justify-content: center; /* Centra la imagen dentro del contenedor */
}

.remaining-products {
    display: flex;
    flex-direction: row; /* Alinea los elementos en fila */
    flex-wrap: nowrap; /* No permite el ajuste automático a la siguiente línea */
    overflow-x: auto; /* Permite el desplazamiento horizontal si hay muchos elementos */
    gap: 10px; /* Espacio entre las imágenes pequeñas */
    width: 100%; /* Usa el ancho completo disponible del contenedor padre */
    justify-content: flex-start; /* Alinea los productos pequeños al inicio del contenedor */
    padding-bottom: 10px; /* Espacio adicional en la parte inferior para el scroll horizontal */
}

.small-product {
    flex: 0 0 auto; /* Evita que el contenedor de la imagen se redimensione automáticamente */
    width: 15vh; /* Ajusta el tamaño según sea necesario */
    margin: 0; /* Elimina el margen para que las imágenes se alineen correctamente */
    display: flex;
    justify-content: center; /* Centra la imagen dentro del contenedor pequeño */
}

.small-product img {
    width: 80%; /* Ajusta el tamaño de la imagen al contenedor */
    height: 15vh; /* Mantiene la proporción de la imagen */
}

.product-card img {
    max-width: 100%;
    height: 50vh;
}
</style>

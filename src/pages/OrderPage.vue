<template>    
    <ModalCart @cart-updated="handleCartUpdated"/>
    <div class="product-details">            
        <div class="image-section">
            <img :src="product.url" alt="Product Image" />
        </div>
        <div class="info-section">
            <h1>{{ product.name }}</h1>
            <p>Precio: ${{ product.price }}</p>
            <p v-if="product.categoryName === 'Cierres'">*Incluye 2 seguros*</p>
            <label for="quantity">{{ unit }}:</label>
            <input type="number" v-model.number="quantity" min="1" id="quantity" />
            <button @click="addToCart">Añadir a la cuenta</button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ModalCart from '../components/ModalCart.vue';

const route = useRoute();
const product = ref({});
const quantity = ref(1);
const unit = ref('');

async function fetchProduct() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_TELASEMANUEL}/products/${route.params.product}`);
        product.value = response.data;
        setUnit(product.value.categoryName);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

function setUnit(categoryName) {
    if (['Cierres', 'Viniles'].includes(categoryName)) {
        unit.value = 'Metros';
    } else if (['Hules espuma'].includes(categoryName)) {
        unit.value = 'Piezas';
    } else if(['Pegamentos']){
        unit.value = 'Litros';
    }
}

function addToCart() {        
    const item = {
        name: product.value.name,
        price: product.value.price,
        quantity: parseInt(quantity.value),
        unit: unit.value
    };
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const existingItem = cart.find(p => p.name === item.name && p.unit === item.unit);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    // Emitir evento hacia el componente padre
    handleCartUpdated(cart);
    alert(`Se añadieron ${quantity.value} ${unit.value} de ${product.value.name}`);    
}

function handleCartUpdated(cart) {
    // Emitir evento para actualizar el carrito en ModalCart.vue
    const event = new CustomEvent('cart-updated', { detail: cart });
    window.dispatchEvent(event);
}

onMounted(fetchProduct);
</script>

<style scoped>
.product-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
}

.image-section {
    flex: 1;
    max-width: 100%;
    margin-right: 20px;
}

.info-section {
    flex: 1;
    min-width: 250px;
}

img {
    max-width: 100%;
    height: auto;
    max-height: 300px; /* Limit the height of the image */
}

label {
    display: block;
    margin-top: 10px;
}

input[type="number"] {
    width: 100px;
    padding: 5px;
    margin-top: 5px;
}

button {
    margin-top: 10px;
    padding: 5px 10px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .product-details {
        flex-direction: column;
    }

    .image-section {
        margin-right: 0;
        margin-bottom: 20px;
    }

    .info-section {
        min-width: 100%;
    }
}
</style>

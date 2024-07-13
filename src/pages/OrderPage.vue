<template>
    <ModalCart @cart-updated="handleCartUpdated"/>
    <div class="product-container">            
        <div class="image-section">
            <img :src="product.url" alt="Product Image" />
        </div>
        <div class="info-section">
            <h1>{{ product.name }}</h1>
            <p class="price">Precio: ${{ product.price }}</p>
            <p v-if="product.categoryName === 'Cierres'" class="note">*Incluye 2 carretes*</p>
            <div class="quantity-controls">
                <label>{{ unit }}:</label>
                <div class="quantity-buttons">
                    <button @click="decreaseQuantity" class="quantity-button">-</button>
                    <span class="quantity-display">{{ quantity }}</span>
                    <button @click="increaseQuantity" class="quantity-button">+</button>
                </div>
            </div>
            <button @click="addToCart" class="add-to-cart-button">Añadir a la cuenta</button>
        </div>
    </div>
    <Modal :visible="isModalVisible" @close="isModalVisible = false">
        <p>Se añadieron {{ quantity }} {{ unit }} de {{ product.name }}</p>
    </Modal>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ModalCart from '../components/ModalCart.vue';
import Modal from '../components/Modal.vue';

const route = useRoute();
const product = ref({});
const quantity = ref(0.5);
const unit = ref('');
const isModalVisible = ref(false);

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
    } else if (['Pegamentos'].includes(categoryName)) {
        unit.value = 'Litros';
    }
}

function addToCart() {        
    const item = {
        name: product.value.name,
        price: product.value.price,
        quantity: parseFloat(quantity.value),
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
    handleCartUpdated(cart);
    isModalVisible.value = true;  
}

function handleCartUpdated(cart) {
    const event = new CustomEvent('cart-updated', { detail: cart });
    window.dispatchEvent(event);
}

function decreaseQuantity() {
    if (quantity.value > 0.5) {
        quantity.value = Math.round((quantity.value - 0.5) * 10) / 10;
        if (quantity.value < 0.5) {
            quantity.value = 0.5;
        }
    }
}

function increaseQuantity() {
    quantity.value = Math.round((quantity.value + 0.5) * 10) / 10;
}

onMounted(fetchProduct);
</script>

<style scoped>
.product-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    max-width: 1200px; /* Asegura que el contenedor principal no se extienda demasiado */
}

.image-section, .info-section {
    flex: 1 1 calc(50% - 10px); /* Asegura que ambos contenedores ocupen 50% menos el margen */
    max-width: 45%; /* Limita el tamaño máximo de los contenedores */
    margin-bottom: 20px; /* Añade espacio en la parte inferior para separación en pantallas pequeñas */
}

.image-section {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}

img {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    border-radius: 10px;
}

h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.price {
    font-size: 20px;
    color: #888;
    margin-bottom: 10px;
    text-align: center;
}

.note {
    font-size: 14px;
    color: #ff4d4d;
    margin-bottom: 10px;
    text-align: center;
}

.quantity-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}

.quantity-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}

.quantity-button {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.3s;
}

.quantity-button:hover {
    background: #0056b3;
}

.quantity-display {
    width: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.add-to-cart-button {
    margin-top: 30px;
    padding: 15px 30px;
    background: #28a745;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    transition: background 0.3s;
}

.add-to-cart-button:hover {
    background: #218838;
}

@media (max-width: 768px) {
    .product-container {
        flex-direction: column;
        align-items: center;
        padding: 10px;
    }

    .image-section, .info-section {
        flex: 1 1 100%;
        max-width: 100%;
        margin-bottom: 20px; /* Añade espacio en la parte inferior para separación en pantallas pequeñas */
    }

    .info-section {
        padding: 75px;      
    }

    img {
        max-height: 300px;
    }

    .quantity-button {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }

    .add-to-cart-button {
        padding: 10px 20px;
        font-size: 16px;
    }
}
</style>

<template>
    <div class="cart-container">
        <h2 class="cart-title">Carrito de Compras</h2>

        <div v-if="cart.length === 0" class="empty-cart">
            <p>¡Tu carrito está vacío!</p>
        </div>

        <div v-else>
            <div class="cart-items">
                <div v-for="(item, index) in cart" :key="index" class="cart-item">
                    <div class="item-info">
                        <h3>{{ item.name }}</h3>
                        <p class="item-price">Precio unitario: ${{ item.price }}</p>
                        <p>Cantidad: {{ item.quantity }}</p>
                        <p class="item-total">Total: ${{ item.price * item.quantity }}</p>
                    </div>

                    <div class="item-actions">
                        <div class="quantity-controls">
                            <button @click="changeQuantity(index, 'decrement')" class="quantity-button">-</button>
                            <span class="quantity-text">{{ item.quantity }}</span>
                            <button @click="changeQuantity(index, 'increment')" class="quantity-button">+</button>
                        </div>
                        <button @click="removeFromCart(index)" class="remove-btn">Eliminar</button>
                    </div>
                </div>
            </div>

            <div class="cart-total">
                <h3>Total: ${{ getTotal() }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['cart-updated']);

const props = defineProps({
    cartItems: Array
});

const cart = ref([]);

watch(() => props.cartItems, (newVal) => {
    cart.value = newVal;
}, { immediate: true });

watch(cart, (newCart) => {
    emitUpdate();
}, { deep: true });

function removeFromCart(index) {
    cart.value.splice(index, 1);
}

function changeQuantity(index, type) {
    if (type === 'increment') {
        cart.value[index].quantity++;
    } else if (type === 'decrement' && cart.value[index].quantity > 1) {
        cart.value[index].quantity--;
    }
}

function getTotal() {
    return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
}

function emitUpdate() {
    emit('cart-updated', cart.value);
}
</script>

<style scoped>
.cart-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center; /* Centra el contenido en pantallas pequeñas */
}

.cart-title {
    font-size: 2rem;
    color: #000;
    /* Color negro */
    text-align: center;
}

.empty-cart {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
    color: #6c757d;
}

.cart-items {
    margin-top: 20px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ced4da;
    padding: 10px 0;
    text-align: left; /* Ajusta el texto a la izquierda en pantallas pequeñas */
}

.item-info {
    flex: 1;
}

.item-price,
.item-total {
    color: #6c757d;
}

.item-actions {
    display: flex;
    align-items: center;
    flex-direction: column; /* Cambia la dirección del flex en pantallas pequeñas */
    margin-top: 10px;
}

.quantity-controls {
    display: flex;
    align-items: center;
    flex-direction: row; /* Asegura que los controles de cantidad estén en fila en pantallas pequeñas */
}

.quantity-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    margin: 0 5px; /* Ajusta el margen de los botones de cantidad */
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.quantity-button:hover {
    background-color: #0056b3;
}

.quantity-text {
    margin: 0 10px;
    font-size: 1.2rem;
}

.remove-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    margin: 10px 0 0; /* Ajusta el margen del botón de eliminar */
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.remove-btn:hover {
    background-color: #c82333;
}

.cart-total {
    margin-top: 20px;
    text-align: center; /* Centra el texto del total en pantallas pequeñas */
}
</style>

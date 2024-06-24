<template>
    <div class="cart">
        <h2>Carrito de Compras</h2>
        <div v-if="cart.length === 0">
            <p>El carrito está vacío.</p>
        </div>
        <div v-else>
            <div v-for="(item, index) in cart" :key="index" class="cart-item">
                <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>Precio unitario: ${{ item.price }}</p>                    
                    <p>Cantidad: {{ item.quantity }} {{ item.unit }}</p>
                    <p>Total: ${{ item.price * item.quantity }}</p>
                </div>
                <div class="item-actions">
                    <button @click="removeFromCart(index)">Eliminar</button>
                    <label>
                        Cantidad:
                        <input type="number" v-model.number="cart[index].quantity" min="1" @change="updateQuantity(index)">
                    </label>
                </div>
            </div>
            <div class="total">
                <h3>Total: ${{ getTotal() }}</h3>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cart = ref([]);

onMounted(() => {
    const cartItems = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart.value = cartItems;
});

function removeFromCart(index) {
    cart.value.splice(index, 1);
    localStorage.setItem('shoppingCart', JSON.stringify(cart.value));
}

function updateQuantity(index) {
    if (cart.value[index].quantity < 1) {
        cart.value[index].quantity = 1;
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart.value));
}

function getTotal() {
    return cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
}
</script>

<style scoped>
.cart {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
}

.item-info {
    flex: 1;
}

.item-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

input[type="number"] {
    width: 60px;
    padding: 5px;
}

button {
    margin-top: 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.total {
    margin-top: 20px;
    text-align: right;
}
</style>

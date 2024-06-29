<template>
  <div>
    <button @click="showCart = true">
      <font-awesome-icon icon="shopping-cart" />
      <span class="badge" v-if="cartItems.length > 0">{{ cartItems.length }}</span>
    </button>
    <Modal :visible="showCart" @close="showCart = false">
      <Cart :cartItems="cartItems" @cart-updated="updateCartItems" />
    </Modal>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import Modal from './Modal.vue';
import Cart from './Cart.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Register FontAwesome icon
library.add(faShoppingCart);

const showCart = ref(false);
const cartItems = ref([]);

// Load cart items from localStorage on component mount
onMounted(() => {
  loadCartItems();
  // Escuchar el evento cart-updated
  window.addEventListener('cart-updated', handleCartUpdated);
});

// Watch for changes in cartItems to update localStorage and badge
watch(cartItems, (newItems) => {
  updateLocalStorage();
}, { deep: true });

function loadCartItems() {
  const items = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cartItems.value = items;
}

function updateLocalStorage() {
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
}

function updateCartItems(items) {
  cartItems.value = items;
}

// Manejar el evento cart-updated
function handleCartUpdated(event) {
  cartItems.value = event.detail;
}
</script>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* Adjust icon size as needed */
  position: relative;
}

button:focus {
  outline: none;
}

.badge {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px;
  font-size: 0.8rem;
}
</style>

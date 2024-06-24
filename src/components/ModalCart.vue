<template>
  <div>
    <button @click="showCart = true">
      <font-awesome-icon icon="shopping-cart" />
      <span class="badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
    </button>
    <Modal :visible="showCart" @close="showCart = false">
      <Cart />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Modal from './Modal.vue';
import Cart from './Cart.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const showCart = ref(false);
const cartItems = ref([]);

// Función para cargar los elementos del carrito desde localStorage
const fetchCartItems = () => {
  const items = JSON.parse(localStorage.getItem('shoppingCart')) || [];
  cartItems.value = items;
};

// Ejecutar la función fetchCartItems al montar el componente
onMounted(fetchCartItems);

// Calcula el número total de elementos en el carrito
const cartItemCount = computed(() => cartItems.value.length);

// Función para eliminar un elemento del carrito
const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
};

// Observa cambios en cartItems para verificar si el último elemento se ha eliminado
watch(cartItems, () => {
  if (cartItems.value.length === 0) {
    showCart.value = false; // Oculta el modal cuando el carrito está vacío
  }
});
</script>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* Ajusta el tamaño del icono según sea necesario */
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

<template>
    <div class="category-card" @click="handleClick">
      <img :src="category.url" alt="Category Image" />
      <h3>{{ category.name }}</h3>
    </div>
  </template>
  
  <script setup>
  //import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    category: Object
  });
  
  const emits = defineEmits(['select-category']);
  
  function handleClick() {
    emits('select-category', props.category.name);
  }
  </script>
  
  <style scoped>
  .category-card {
    cursor: pointer;
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
    flex: 1; /* Ocupa el espacio disponible */
    margin: 10px; /* Margen entre las tarjetas */
    display: flex; /* Usa flexbox para alinear las tarjetas */
    flex-direction: column; /* Dirección de los elementos */
    align-items: center; /* Alinea horizontalmente */
  }
  
  .category-card img {
    max-width: 100%;
    height: auto;
  }
  </style>
  
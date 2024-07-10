<template>
  <div class="relative overflow-hidden w-full max-w-4xl mx-auto">
    <div class="flex transition-transform duration-700 ease-in-out" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(slide, index) in slides" :key="index" class="flex-shrink-0 w-full">
        <img :src="slide" alt="" class="w-full h-80 object-cover rounded-lg shadow-md">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let intervalId

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
}

const startAutoSlide = () => {
  intervalId = setInterval(next, 3000) // Cambia las imágenes cada 3 segundos
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.flex {
  display: flex;
  transition: transform 0.7s ease-in-out;
}

.flex-shrink-0 {
  flex-shrink: 0;
  width: 100%;
}

.relative {
  position: relative;
}

.overflow-hidden {
  overflow: hidden;
}

.absolute {
  position: absolute;
}

.left-4 {
  left: 1rem;
}

.right-4 {
  right: 1rem;
}

.top-1\/2 {
  top: 50%;
}

.transform {
  transform: translateY(-50%);
}

.bg-gray-700 {
  background-color: #4a5568;
}

.hover\:bg-gray-800:hover {
  background-color: #2d3748;
}

.text-white {
  color: #ffffff;
}

.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.rounded-full {
  border-radius: 9999px;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.focus\:outline-none:focus {
  outline: 0;
}

.w-full {
  width: 100%;
}

.h-80 {
  height: 20rem;
}

.object-cover {
  object-fit: cover;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.z-10 {
  z-index: 10;
}
</style>

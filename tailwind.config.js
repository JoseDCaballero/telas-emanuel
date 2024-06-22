// tailwind.config.js

import { defineConfig } from 'tailwindcss'

export default defineConfig({
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // Puedes cambiar a 'media' o 'class' si necesitas soporte de dark mode
  theme: {
    extend: {}, // Aquí puedes extender o modificar los estilos por defecto de Tailwind
  },
  variants: {
    extend: {}, // Aquí puedes extender o modificar las variantes de clases de Tailwind
  },
  plugins: [
    // Aquí puedes agregar plugins adicionales de Tailwind
    // Ejemplo: require('@tailwindcss/forms'),
  ],
})

import { createRouter, createWebHistory } from 'vue-router'
import { 
  HomePage,
  ProductsPage,
  CategoryPage,
  OrderPage 
} from './pages/index.js'
import DefaultLayout from './layouts/DefaultLayout.vue';

const routes = [
  {
    path: '/1',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Inicio',
      layout: DefaultLayout
    }
  },
  {
    path: '/cateories/',
    name: 'product',
    component: CategoryPage,
    meta:{
      title: 'Categorías',
      layout: DefaultLayout
    }    
  },
  {
    path: '/catories/:categoryName',
    name: 'products',
    component: ProductsPage,
    meta:{
      title: 'Productos',
      layout: DefaultLayout
    }
  },
  {
    path: '/catries/:categoryNe/:product',
    name: 'OrderPage',
    component: OrderPage,
    meta:{
      title: 'Información',
      layout: DefaultLayout
    }
  }
]

const router = createRouter({  
  history: createWebHistory('#'),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ?? 'Tienda'
})

export default router
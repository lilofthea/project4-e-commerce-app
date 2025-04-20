import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue' // tek sayfa için bile bu kalabilir

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  {
    path: '/cart',
    name: 'Cart',
    component: App // örnek olarak tekrar App.vue; farklı bir component varsa onu yaz
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

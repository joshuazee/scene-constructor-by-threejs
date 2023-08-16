import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/map-home/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
  ]
});

export default router;

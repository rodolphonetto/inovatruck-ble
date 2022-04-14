import { createRouter, createWebHistory } from '@ionic/vue-router'
import Login from '../views/Login.vue'
import Pecas from '../views/Pecas.vue'
import PecaAviso from '../views/PecaAviso.vue'
import Comandos from '../views/Comandos.vue'
import TestPage from '../views/TestPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/pecas',
    name: 'Pecas',
    component: Pecas,
  },
  {
    path: '/peca-aviso',
    name: 'PecaAviso',
    component: PecaAviso,
  },
  {
    path: '/comandos',
    name: 'Comandos',
    component: Comandos,
  },
  {
    path: '/test-page',
    name: 'TestPage',
    component: TestPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

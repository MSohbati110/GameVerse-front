import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'
import GamesPage from '@/views/GamesPage.vue'
import Sudoku from '@/components/Sudoku.vue'
import Tanktrouble from '@/components/Tanktrouble.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/games',
    name: 'GamesPage',
    component: GamesPage
  },
  {
    path: '/games/sudoku',
    name: 'Sudoku',
    component: Sudoku
  },
  {
    path: '/games/Tanktrouble',
    name: 'Tanktrouble',
    component: Tanktrouble
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

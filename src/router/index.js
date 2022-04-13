import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeOld from '../views/HomeOld'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/v1',
    name: 'Old',
    component: HomeOld
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

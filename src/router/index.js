import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    // route level code-splitting
    // this generates a separate chunk (demo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "demo" */ 'views/Demo.vue')
  },
  {
    path: '/camera',
    name: 'Camera',
    // route level code-splitting
    // this generates a separate chunk (demo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "demo" */ 'views/demo/Camera/Camera.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

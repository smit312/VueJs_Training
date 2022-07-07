import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _54b7bf22 = () => interopDefault(import('../pages/Car/index.vue' /* webpackChunkName: "pages/Car/index" */))
const _3f1cca2e = () => interopDefault(import('../pages/cardetails/index.vue' /* webpackChunkName: "pages/cardetails/index" */))
const _90e3c512 = () => interopDefault(import('../pages/Home.vue' /* webpackChunkName: "pages/Home" */))
const _73e4ff14 = () => interopDefault(import('../pages/UserLogin.vue' /* webpackChunkName: "pages/UserLogin" */))
const _5b893ca6 = () => interopDefault(import('../pages/UserRegister.vue' /* webpackChunkName: "pages/UserRegister" */))
const _434d7297 = () => interopDefault(import('../pages/Car/_id.vue' /* webpackChunkName: "pages/Car/_id" */))
const _1700b50a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/Car",
    component: _54b7bf22,
    name: "Car"
  }, {
    path: "/cardetails",
    component: _3f1cca2e,
    name: "cardetails"
  }, {
    path: "/Home",
    component: _90e3c512,
    name: "Home"
  }, {
    path: "/UserLogin",
    component: _73e4ff14,
    name: "UserLogin"
  }, {
    path: "/UserRegister",
    component: _5b893ca6,
    name: "UserRegister"
  }, {
    path: "/Car/:id",
    component: _434d7297,
    name: "Car-id"
  }, {
    path: "/",
    component: _1700b50a,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

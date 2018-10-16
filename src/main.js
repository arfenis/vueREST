// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// eslint-disable-next-line
import App from './App'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueRouter from 'vue-router'
import Providerauditions from './components/Providerauditions'
import Providerdetails from './components/Providerdetails'
import Providerinfo from './components/Providerinfo'

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: Providerauditions
    },
    {
      name: 'provider',
      path: '/provider/:providerId',
      component: Providerdetails
    },
    {
      name: 'providerinfo',
      path: '/info',
      component: Providerinfo
    }
  ]
})
new Vue({
  router,
  template: `
    <div id="app">
      <nav class="navbar navbar-expand-sm" style="background:#ff3300">
        <a class="navbar-brand" href="#" style="color:white;">Usuario CT</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample03">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            <router-link to="/" class="nav-link" style="color:white;">Proveedores</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/" class="nav-link" style="color:white;">Compradores</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/" class="nav-link" style="color:white;">Items</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <router-view></router-view>
    </div>
    `
}).$mount('#app')

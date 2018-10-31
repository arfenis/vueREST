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
import Buyerauditions from './components/Buyerauditions'
import Buyerdetails from './components/Buyerdetails'
import BuyerNavbar from './components/BuyerNavbar'
import 'v2-datepicker/lib/index.css'
import V2Datepicker from 'v2-datepicker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(V2Datepicker)
Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'provider',
      path: '/providers',
      component: Providerauditions
    },
    {
      name: 'providerdetails',
      path: '/provider/:providerId',
      component: Providerdetails
    },
    {
      name: 'buyer',
      path: '/buyers',
      component: Buyerauditions
    },
    {
      name: 'buyerdetails',
      path: '/buyer/:companyId',
      component: Buyerdetails
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
            <router-link to="/providers" class="nav-link" style="color:white;">Proveedores</router-link>
            </li>
            <li class="nav-item">
            <router-link to="/buyers" class="nav-link" style="color:white;">Compradores</router-link>
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

Vue.component('buyer-navbar', BuyerNavbar)

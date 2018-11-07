<template>
    <div>
      <div>
          <h1 style="text-align:left;"> {{title}} </h1>
      <buyer-navbar v-bind:menu=menu> </buyer-navbar>
      <label>Buscar </label>
      <input placeholder="Nombre de la compa;ia" v-model="filter.search" type="text">
        <span>Fecha: </span>
        <v2-datepicker-range v-model="filter.date" lang="en" format="yyyy-MM-DD"></v2-datepicker-range>

        <span>Industria: </span>
        <select v-model="filter.industry">
          <option value=" ">Industria</option>
          <option v-for="industry in industries" :key="industry.id" :value=industry.id>{{industry.industry_name}}</option>
        </select>

        <span>Region: </span>
        <select v-model="filter.region">
          <option value=" ">Todos</option>
          <option v-for="region in regions" :key="region.id" :value=region.id>{{region.region_name}}</option>
        </select>

        <span>Status: </span>
        <select v-model="filter.status">
          <option value="">Todos</option>
          <option v-for="status in status_data" :key="status.id" :value=status.id>{{status.name}}</option>
        </select>

        <table class="table">
          <thead>
            <tr>
              <th v-for="column in colums_titles" v-bind:key="column.id">{{column.name}}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="buyer in filteredBuyer">
            <tr v-bind:key="buyer.user_id">
                <td>{{buyer.company_name}}</td>
                <td>{{buyer.user_name}}</td>
                <td>{{buyer.email}}</td>
                <td> 899900 </td>
                <td>{{buyer.city_name}}</td>
                <td v-if="buyer.status_id == 14">Registrar</td>
                <td v-else>{{buyer.status_name}}</td>
                <td>
                    <i class="glyphicon glyphicon-eye-open" @click="showModal(buyer.user_id, 1)"> </i>
                    <i class="glyphicon glyphicon-pencil" @click="showModal(buyer.user_id, 2)"></i>
                    <i class="glyphicon glyphicon-trash" @click="showModal"></i>
                </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>
        <modal :user_data=user_data v-show="isModalVisible" @close="closeModal"/>
    </div>
</template>

<script>
import modal from './BuyerComponents/DataModalComponent.vue'
import _ from 'lodash'

export default {
  name: 'buyer_info',
  components: {
    modal
  },
  data () {
    return {
      colums_titles: [
        {
          name: 'Empresas'
        },
        {
          name: 'Nombre de contacto'
        },
        {
          name: 'Email'
        },
        {
          name: 'Telefono'
        },
        {
          name: 'Ciudad'
        },
        {
          name: 'Estatus'
        },
        {
          name: 'Accion'
        }
      ],
      status_data: [
        {
          name: 'Registrar',
          id: 14
        },
        {
          name: 'Validar datos',
          id: 21
        },
        {
          name: 'Elegir plan',
          id: 22
        }
      ],
      menu: 1,
      buyer_info: [],
      title: 'Compradores Pendientes',
      pagination: {},
      edit: false,
      filter: {
        search: '',
        industry: '',
        city: '',
        date: '',
        region: '',
        status: ''
      },
      categories: [],
      regions: [],
      industries: [],
      cities: [],
      provincies: [],
      isModalVisible: false,
      user_data: Object
    }
  },
  created () {
    this.fetchAuditions()
  },
  computed: {
    Categoryfilter () {
      return this.categories.filter(cate => {
        return parseInt(cate.industry_id) === parseInt(this.filter.industry)
      })
    },
    filteredBuyer: function () {
      return this.filteredSearch(this.filter.search, this.filteredByStatus(this.filter.status, this.buyer_info))
    }
  },
  methods: {
    fetchAuditions () {
      fetch('http://127.0.0.1:8000/api/buyers/pendings')
        .then(res => res.json())
        .then(res => {
          this.buyer_info = res.buyer_info
          this.regions = res.regions
          this.industries = res.industries
          this.cities = res.cities
          this.provincies = res.provincies
        })
    },
    filteredByStatus (id, buyers) {
      return buyers.filter((buyer) => {
        if (id === '') {
          return buyers
        } else {
          return buyer.status_id === id
        }
      })
    },
    filteredSearch (search, buyers) {
      return buyers.filter((buyer) => {
        if (buyer.company_name === null) {
          return buyer.email.match(search)
        } else {
          return buyer.company_name.match(search)
        }
      })
    },
    showModal (userdata, action) {
      let data = this.buyer_info.filter((buyer) => {
        return buyer.user_id === userdata
      })
      this.user_data = data[0]
      this.user_data.action = action
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    len: _.debounce(
      function () {
        this.messageLength = this.filter.search.length
        this.postRequest()
      },
      800
    )
  }
}
</script>

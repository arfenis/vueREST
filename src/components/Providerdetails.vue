<template :name ="provider.id">
  <div style="text-align:center;">
    <div class="row">
      <div class="col-sm-12 col-md-12" style="text-align:left;">
        <h1> {{title}}</h1>
        <h2> {{provider.company_name}} </h2>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12">
        <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
          <div class="navbar" id="navbarsExample09">
            <ul class="nav nav-tabs">
              <li class="nav-item" @click="menu = 1">
                <a class="nav-link">Licitaciones</a>
              </li>
              <li class="nav nav-tabs" @click="menu = 2">
                <a class="nav-link">General</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div id="providerdetails" v-if="menu==1">
      <label>Buscar </label>
      <input placeholder="Nombre de la compa;ia" v-model="filter.search" v-on:keyup="len" type="text">

        <span>Industria: </span>
        <select v-model="filter.industry">
          <option value=" ">Industria</option>
          <option v-for="industry in industries" :key="industry.id" :value=industry.id>{{industry.industry_name}}</option>
        </select>

      <span>Categoria: </span>
        <select v-model="filter.category" v-on:change="postRequest">
          <option v-for="category in Fetchfilter" :key="category.id" :value=category.id>{{category.category_name}}</option>
        </select>

        <span>Estado: </span>
        <select v-model="filter.status" v-on:change="postRequest">
          <option value="">Estado</option>
          <option v-for="status in status_data" :key="status.id" :value="status.id">{{status.status_name}}</option>
        </select>
      <div class="row">
        <div class="col-sm-12 col-md-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Nombre</th>
                <th scope="col">Categoría(s)</th>
                <th scope="col">Fecha de creacíon</th>
                <th scope="col">Estado</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bidding in biddings" v-bind:key="bidding.id">
                  <td scope="row">{{bidding.bidding_code}}</td>
                  <td><p class="tbladju1"> <strong> {{bidding.bidding_name}} </strong></p>
                      <p class="tlbadju2">{{bidding.company_name}}</p></td>
                  <td>{{bidding.category_name}}</td>
                  <td>{{bidding.created_at}}</td>
                  <td>{{bidding.status_name}}</td>
                  <td><router-link :to="{ name: 'provider', params: { providerId: provider.id, providerName: provider.company_name}}">Accion</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="providerdata" v-if="menu==2">
      <providerdata v-bind:companyData="provider"> </providerdata>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Providerdata from './Providerdata.vue'

export default{
  name: 'providerdetails',
  data () {
    return {
      menu: 1,
      biddings: [],
      title: 'Proveedores',
      biddings_info: {
        id: '',
        company_name: '',
        invitations_count: '',
        participated_count: '',
        adjudicated_count: '',
        total_clients: ''
      },
      pagination: {},
      edit: false,
      filter: {
        search: '',
        status: '',
        category: '',
        date: ''
      },
      categories: [],
      provider_info: [],
      provider: {
        id: this.$route.params.providerId,
        company_name: ''
      },
      industries: [],
      status_data: [
        {
          id: 5,
          status_name: 'Invitado'
        },
        {
          id: 7,
          status_name: 'Participando'
        },
        {
          id: 9,
          status_name: 'Adjudicada'
        },
        {
          id: 8,
          status_name: 'Cerrada'
        },
        {
          id: 4,
          status_name: 'Rechazada'
        }
      ]
    }
  },
  components: {
    providerdata: Providerdata
  },
  mounted () {
    this.fetchBiddings()
  },
  computed: {
    Fetchfilter () {
      return this.categories.filter(cate => {
        return parseInt(cate.industry_id) === parseInt(this.filter.industry)
      })
    }
  },
  methods: {
    fetchBiddings () {
      fetch('http://127.0.0.1:8000/api/providers/' + this.provider.id)
        .then(res => res.json())
        .then(res => {
          this.biddings = res.biddings_info
          this.categories = res.categories
          this.industries = res.industries
          this.provider = res.provider_info
          this.filter.provider_id = res.provider_info.id
        })
    },
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/providers/filter', this.filter)
        .then(function (response) {
          me.biddings = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    blockprovider () {
      console.log('clicked')
    },
    len: _.debounce(
      function () {
        this.messageLength = this.filter.search.length
        console.log(this.filter.search)
        this.postRequest()
      },
      800
    )
  }
}
</script>

<style>
    .btn {
    background-color: DodgerBlue; /* Blue background */
    border: none; /* Remove borders */
    color: white; /* White text */
    padding: 12px 16px; /* Some padding */
    font-size: 16px; /* Set a font size */
    cursor: pointer; /* Mouse pointer on hover */
}

/* Darker background on mouse-over */
.btn:hover {
    background-color: RoyalBlue;
}

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>

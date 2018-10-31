<template>
    <div>
    <h1 style="text-align:left;"> {{title}} </h1>
     <label>Buscar </label>
     <input placeholder="Nombre de la compa;ia" v-model="filter.search" v-on:keyup="len" type="text">
      <span>Fecha: </span>
      <v2-datepicker-range v-model="filter.date" lang="en" format="yyyy-MM-DD" v-on:change="postRequest"></v2-datepicker-range>

      <span>Industria: </span>
      <select v-model="filter.industry" v-on:change="postRequest">
        <option value=" ">Industria</option>
        <option v-for="industry in industries" :key="industry.id" :value=industry.id>{{industry.industry_name}}</option>
      </select>

     <span>Region: </span>
      <select v-model="filter.region" v-on:change="postRequest">
        <option value=" ">Region</option>
        <option v-for="region in regions" :key="region.id" :value=region.id>{{region.region_name}}</option>
      </select>

      <span>Filtros: </span>
      <select v-model="filter.provider" >
        <option value=" ">Estado</option>
        <option value="p_blockeds">Clientes con 0 licitaciones</option>
        <option value="p_blockeds">Licitaciones cerradas sin adjudicar</option>
        <option value="p_blockeds">Licitaciones desiertas con ofertas</option>
        <option value="p_blockeds">Licitaciones desiertas sin ofertas</option>
      </select>

     <table class="table">
       <thead>
         <tr>
           <th v-for="column in colums_titles" v-bind:key="column.id">{{column.name}}</th>
         </tr>
       </thead>
       <tbody>
         <template v-for="buyer in buyer_info">
        <tr v-bind:key="buyer.id">
            <td scope="row">
                <input type="checkbox" id="checkbox" checked v-if="buyer.bidding_public==true" disabled>
            </td>
            <td>{{buyer.company_name}}<a @click="buyer.contentVisible = !buyer.contentVisible"><i class="glyphicon glyphicon-triangle-bottom"></i></a>
            </td>
            <td>{{buyer.bidding_count}}</td>
            <td>{{buyer.offers_count}}</td>
            <td>{{buyer.currency_symbol}}</td>
            <td>{{buyer.currency_symbol}}{{buyer.adjudicated_count}}</td>
            <td>30%</td>
            <td>{{buyer.status_name}}</td>
            <td>3 meses</td>
            <td>3</td>
            <td>icono.png</td>
        </tr>
          <template v-if="buyer.contentVisible" v-for="buyer_usuarios in buyer.usuarios">
            <tr v-bind:key="buyer_usuarios.user_id">
                  <td></td>
                  <td>{{buyer_usuarios.firstname}}({{buyer_usuarios.role}}) </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{buyer.status_name}}</td>
                  <td>3 meses</td>
                  <td>3</td>
                  <td></td>
            </tr>
          </template>
         </template>
      </tbody>
     </table>

    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'buyer_info',
  data () {
    return {
      colums_titles: [
        {
          name: 'L. Publicas'
        },
        {
          name: 'Empresa'
        },
        {
          name: 'Licitaciones colocadas'
        },
        {
          name: 'Licitaciones con ofertas'
        },
        {
          name: '$'
        },
        {
          name: 'Total adjudicado'
        },
        {
          name: 'Indice de ahorro'
        },
        {
          name: 'Estado'
        },
        {
          name: 'Plan'
        },
        {
          name: 'Dias restantes de servicio'
        },
        {
          name: 'Accion'
        }
      ],
      buyer_info: [],
      title: 'Compradores',
      pagination: {},
      edit: false,
      filter: {
        search: '',
        industry: '',
        filters: '',
        date: '',
        region: '',
        status: ''
      },
      categories: [],
      categories_data: {
        id: '',
        category_name: '',
        industry_id: ''
      },
      regions: [],
      industries: [],
      industries_data: {
        id: '',
        industry_name: '',
        industry_description: ''
      }
    }
  },
  created () {
    this.fetchAuditions()
  },
  computed: {
    Fetchfilter () {
      return this.categories.filter(cate => {
        return parseInt(cate.industry_id) === parseInt(this.filter.industry)
      })
    }
  },
  methods: {
    fetchAuditions () {
      fetch('http://127.0.0.1:8000/api/buyers')
        .then(res => res.json())
        .then(res => {
          this.buyer_info = res.buyer_info
          this.regions = res.regions
          this.industries = res.industries
        })
    },
    toggle (id) {
      const index = this.opened.indexOf(id)
      if (index > -1) {
        this.opened.splice(index, 1)
      } else {
        this.opened.push(id)
      }
    },
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/buyers/filter', this.filter)
        .then(function (response) {
          me.buyer_info = response.data.buyer_info
        })
        .catch(function (error) {
          console.log(error)
        })
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

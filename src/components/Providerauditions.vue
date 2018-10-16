<template>

  <div style="text-align:center;">
     <h1 style="text-align:left;"> {{title}} </h1>
     <label>Buscar </label>
     <input placeholder="Nombre de la compa;ia" v-model="filter.search" v-on:keyup="len" type="text">

      <span>Industria: </span>
      <select v-model="filter.industry">
        <option value=" ">Industria</option>
        <option v-for="industry in industries" :key="industry.id" :value=industry.id>{{industry.industry_name}}</option>
      </select>

     <span>Categoria: </span>
      <select v-model="filter.category" v-on:change="postRequest">
        <option value=" ">Categoria</option>
        <option v-for="category in Fetchfilter" :key="category.id" :value=category.id>{{category.category_name}}</option>
      </select>

      <span>Filtros: </span>
      <select v-model="filter.provider" v-on:change="postRequest">
        <option value=" ">Estado</option>
        <option value="p_blockeds">Proveedores bloqueados</option>
        <option value="p_without_oferts">Proveedores sin ofertas</option>
      </select>

     <table class="table">
       <thead>
         <tr>
           <th scope="col">Compañia</th>
           <th scope="col">Invitaciones</th>
           <th scope="col">Cantidad adjudicados</th>
           <th scope="col">Cantidad participadas</th>
           <th scope="col">Cantidad bloqueos</th>
           <th scope="col">Cantidad de clientes</th>
           <th scope="col">Acción</th>
         </tr>
       </thead>
       <tbody>
        <tr v-for="provider in providers" v-bind:key="provider.id">
            <td scope="row">{{provider.company_name}}</td>
            <td>{{provider.invitations_count}}</td>
            <td>{{provider.adjudicated_count}}</td>
            <td>{{provider.participated_count}}</td>
            <td>{{provider.total_blocks}}</td>
            <td>{{provider.total_clients}}</td>
            <td><router-link :to="{ name: 'provider', params: { providerId: provider.id, providerName: provider.company_name}}">Accion</router-link></td>
        </tr>
      </tbody>
     </table>
    </div>

</template>

<script>
import _ from 'lodash'

export default{

  name: 'providers_info',
  data () {
    return {
      providers: [],
      title: 'Proveedores',
      provider_info: {
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
        industry: '',
        category: '',
        date: '',
        provider: ''
      },
      categories: [],
      categories_data: {
        id: '',
        category_name: '',
        industry_id: ''
      },
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
      fetch('http://127.0.0.1:8000/api/audits')
        .then(res => res.json())
        .then(res => {
          this.providers = res.provider_info
          this.categories = res.categories
          this.industries = res.industries
        })
    },
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/providers', this.filter)
        .then(function (response) {
          me.providers = response.data.provider_info
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

<template>
    <div>
        <h1> Proveedores del usuario </h1>
             <label>Buscar </label>
        <input placeholder="No. de la licitacion" v-model="filter.search" type="text" @change="postRequest">

        <span>Categorias: </span>
        <select v-model="filter.category" @change="postRequest">
            <option value=" " selected>Categoria</option>
            <option v-for="category in categories" :key="category.id" :value=category.id>{{category.category_name}}</option>
        </select>

        <span>Estado: </span>
        <select v-model="filter.status" @change="postRequest">
            <option value=" " selected>Estado</option>
            <option v-for="status in statusData" :key="status.id" :value=status.id>{{status.name}}</option>
        </select>

            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Exportar
            </button>

        <div class="row">
            <div class="col-sm-12 col-md-12">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Nombre comercial</th>
                    <th scope="col">Categorias</th>
                    <th scope="col">Contacto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Accion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="providers in company_providers" v-bind:key="providers.id">
                    <td scope="row">{{providers.company_name}}</td>
                    <td><p> {{providers.commercial_name}} </p>
                    <td scope="row">{{providers.category_name}}</td>
                    <td scope="row">{{providers.contact_name}}</td>
                    <td scope="row">{{providers.status_name}}</td>
                    <td> <router-link :to="{ name: 'providerdetails', params: { providerId: providers.id, providerName: providers.company_name}}">Accion</router-link> </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

    </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'providercomponent',
  props: {
    companyProviders: Array,
    categories: Array
  },
  data () {
    return {
      company_providers: this.companyProviders,
      statusData: [
        {
          id: 13,
          name: 'Bloqueado'
        },
        {
          id: 15,
          name: 'Activo'
        }
      ],
      filter:
        {
          search: '',
          category: '',
          status: '',
          component: 'providers',
          company_id: this.$route.params.companyId
        }
    }
  },
  methods: {
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/buyer/filter', this.filter)
        .then(function (response) {
          me.company_providers = response.data.company_providers
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

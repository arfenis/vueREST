<template>
    <div>
        <h1> Items del usuario </h1>
             <label>Buscar </label>
        <input placeholder="No. de la licitacion" v-model="filter.search" type="text" @change="postRequest">

        <span>Categorias: </span>
        <select v-model="filter.category" @change="postRequest">
            <option value=" " selected>Categoria</option>
            <option v-for="category in categories" :key="category.id" :value=category.id>{{category.category_name}}</option>
        </select>

            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Exportar
            </button>

        <div class="row">
            <div class="col-sm-12 col-md-12">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">Codigo</th>
                    <th scope="col">Items</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Accion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="items in company_items" v-bind:key="items.id">
                    <td scope="row">{{items.ir_code}}</td>
                    <td><p> {{items.ir_name}} </p>
                    <td scope="row">{{items.brand_name}}</td>
                    <td scope="row">{{items.category_name}}</td>
                    <td> Accion </td>
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
  name: 'itemscomponent',
  props: {
    companyItems: Array,
    categories: Array
  },
  data () {
    return {
      company_items: this.companyItems,
      filter:
        {
          search: '',
          category: '',
          date: '',
          component: 'items',
          company_id: this.$route.params.companyId
        }
    }
  },
  methods: {
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/buyer/filter', this.filter)
        .then(function (response) {
          me.company_items = response.data.company_items
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

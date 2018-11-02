<template>
    <div>
      <h1> Users </h1>
     <label>Buscar </label>
     <input placeholder="No. de la licitacion" v-model="filter.search" type="text" @change="postRequest">

      <span>Fecha: </span>
      <v2-datepicker-range v-model="filter.date" lang="en" format="yyyy-MM-DD" @change="postRequest"></v2-datepicker-range>

      <span>Rol: </span>
      <select v-model="filter.rol" @change="postRequest">
        <option value=" " selected>Rol</option>
        <option v-for="rol in roles" :key="rol.id" :value=rol.id>{{rol.name}}</option>
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
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Rol</th>
                <th scope="col">Fecha de creacíon</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in company_users" v-bind:key="user.id">
                  <td scope="row">{{user.user_name}}</td>
                  <td><p> {{user.email}} </p>
                  <td scope="row">{{user.role}}</td>
                  <td scope="row">{{user.created_at}}</td>
                  <td scope="row">{{user.status_name}}</td>
                  <td> Ver </td>
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
  name: 'usercomponent',
  props: {
    companyUsers: Array,
    roles: Array
  },
  data () {
    return {
      company_users: this.companyUsers,
      statusData: [
        {
          id: 13,
          name: 'Bloqueado'
        },
        {
          id: 14,
          name: 'Incompleto'
        },
        {
          id: 15,
          name: 'Activo'
        }
      ],
      filter:
        {
          search: '',
          rol: '',
          status: '',
          date: '',
          component: 'users',
          company_id: this.$route.params.companyId
        }
    }
  },
  methods: {
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/buyer/filter', this.filter)
        .then(function (response) {
          me.company_users = response.data.company_users
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

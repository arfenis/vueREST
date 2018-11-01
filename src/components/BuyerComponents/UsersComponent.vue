<template>
    <div>
      <h1> Users </h1>
     <label>Buscar </label>
     <input placeholder="No. de la licitacion" v-model="filter.search" type="text">

      <span>Fecha: </span>
      <v2-datepicker-range v-model="filter.date" lang="en" format="yyyy-MM-DD"></v2-datepicker-range>

      <span>Rol: </span>
      <select v-model="filter.type">
        <option value=" " selected>Rol</option>
        <option v-for="rol in roles" :key="rol.id" :value=rol.id>{{rol.name}}</option>
      </select>

     <span>Estado: </span>
      <select v-model="filter.status">
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
              <tr v-for="user in companyUsers" v-bind:key="user.id">
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
export default {
  name: 'usercomponent',
  props: {
    companyUsers: Array,
    roles: Array
  },
  data () {
    return {
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
      filter: [
        {
          search: '',
          rol: '',
          status: '',
          date: ''
        }
      ]
    }
  }
}

</script>

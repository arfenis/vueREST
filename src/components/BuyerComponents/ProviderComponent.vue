<template>
    <div>
        <h1> Proveedores del usuario </h1>
             <label>Buscar </label>
        <input placeholder="No. de la licitacion" v-model="filter.search" type="text">

        <span>Categorias: </span>
        <select v-model="filter.category">
            <option value=" " selected>Categoria</option>
            <option v-for="category in categories" :key="category.id" :value=category.id>{{category.category_name}}</option>
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
                    <th scope="col">Proveedor</th>
                    <th scope="col">Nombre comercial</th>
                    <th scope="col">Categorias</th>
                    <th scope="col">Contacto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Accion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="providers in companyProviders" v-bind:key="providers.id">
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
export default {
  name: 'providercomponent',
  props: {
    companyProviders: Array,
    categories: Array
  },
  data () {
    return {
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

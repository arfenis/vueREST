<template>
    <div>
        <h1> Items del usuario </h1>
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
                    <th scope="col">Codigo</th>
                    <th scope="col">Items</th>
                    <th scope="col">Marca</th>
                    <th scope="col">Categoria</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Accion</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="items in companyItems" v-bind:key="items.id">
                    <td scope="row">{{items.ir_code}}</td>
                    <td><p> {{items.ir_name}} </p>
                    <td scope="row">{{items.brand_name}}</td>
                    <td scope="row">{{items.category_name}}</td>
                    <td scope="row">{{items.status_name}}</td>
                    <td> Accion </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: 'itemscomponent',
  props: {
    companyItems: Array,
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

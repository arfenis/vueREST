<template>
    <div style="text-align:center;">
        <h1> Bidding </h1>
        <label>Buscar </label>
     <input placeholder="No. de la licitacion" v-model="filter.search" v-on:keyup="len" type="text">

      <span>Fecha: </span>
      <v2-datepicker-range v-model="filter.date" lang="en" format="yyyy-MM-DD" @change="postRequest"></v2-datepicker-range>

      <span>Tipo: </span>
      <select v-model="filter.type" @change="postRequest">
        <option value=" " selected>Tipo</option>
        <option value=1>Privada</option>
        <option value=2>Publica</option>
      </select>

     <span>Estado: </span>
      <select v-model="filter.status" @change="postRequest">
        <option value=" ">Estado</option>
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
                <th scope="col">No.</th>
                <th scope="col">Nombre</th>
                <th scope="col">Tipo</th>
                <th scope="col">Fecha de creacíon</th>
                <th scope="col">Estado</th>
                <th scope="col">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bidding in biddingsdatabuyer" v-bind:key="bidding.id">
                  <td scope="row">{{bidding.bidding_code}}</td>
                  <td><p class="tbladju1"> <strong> {{bidding.bidding_name}} </strong></p>
                      <p class="tlbadju2">{{bidding.user_name}}</p></td>
                  <td scope="row" v-if="bidding.biddingtype=2">Publica</td>
                  <td scope="row" v-else-if="bidding.biddingtype=1">Privada</td>
                  <td>{{bidding.created_at}}</td>
                  <td>{{bidding.status_name}}</td>
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
  name: 'biddingcomponent',
  props: {
    biddingsData: Array
  },
  data () {
    return {
      biddingsdatabuyer: this.biddingsData,
      statusData: [
        {
          id: 7,
          name: 'Activa'
        },
        {
          id: 9,
          name: 'Adjudicada'
        },
        {
          id: 17,
          name: 'Cancelada'
        },
        {
          id: 10,
          name: 'Pendiente'
        }
      ],
      filter:
        {
          search: '',
          status: '',
          type: '',
          date: '',
          component: 'bidding',
          company_id: this.$route.params.companyId
        }
    }
  },
  methods: {
    postRequest () {
      let me = this
      this.axios.post('http://127.0.0.1:8000/api/buyer/filter', this.filter)
        .then(function (response) {
          me.biddingsdatabuyer = response.data.bidding_info
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

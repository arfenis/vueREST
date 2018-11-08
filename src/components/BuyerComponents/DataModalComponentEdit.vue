<template>
  <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

            <div class="modal-header">
                <slot name="header">
                    {{user_validated.email}}
                </slot>
            </div>

            <div class="modal-body">
                <slot name="body">
                    <label>Nombre de la empresa </label>
                    <input :value="user_validated.company_name" v-on:input="user_validated.company_name = $event.target.value" type="text" :disabled= false>
                    <br />
                    <label>Nombre de ID tributario </label>
                    <input v-model="user_validated.tax_number" type="text" :disabled= false>
                    <br />
                    <label>Nombre comercial </label>
                    <input v-model="user_validated.commercial_name" type="text" :disabled= false>
                    <br />
                    <label>Persona de contacto </label>
                    <input placeholder="Nombre" v-model="user_validated.firstname" type="text" :disabled= false>
                    <input placeholder="Apellido" v-model="user_validated.lastname" type="text" :disabled= false>
                    <br />
                    <label>Correo electronico </label>
                    <input v-model="user_validated.email" type="text" :disabled= false>
                    <br />
                    <label>Confirmar correo electronico </label>
                    <input v-model="user_validated.email" type="text" :disabled= false>
                    <br />
                    <label>Direccion principal </label>
                    <input v-model="user_validated.address_description" type="text" :disabled= false>
                    <br />
                    <label>Website </label>
                    <input v-model="user_validated.Website" type="text" :disabled= false>
                    <span>Industria: </span>
                    <select v-model="user_validated.industry_id">
                        <option v-for="industry in industries" :key="industry.id" :value=industry.id>{{industry.industry_name}}</option>
                    </select>
                    <span>Pais: </span>
                    <select v-model="user_validated.country_id">
                        <option v-for="country in countries" :key="country.id" :value=country.id>{{country.country_name}}</option>
                    </select>
                    <span>Region: </span>
                    <select v-model="user_validated.region_id">
                        <option v-for="region in region_list" :key="region.id" :value=region.id>{{region.region_name}}</option>
                    </select>
                    <span>Provincia: </span>
                    <select v-model="user_validated.province_id">
                        <option v-for="province in province_list" :key="province.id" :value=province.id>{{province.province_name}}</option>
                    </select>
                    <span>Ciudad: </span>
                    <select v-model="user_validated.city_id">
                        <option v-for="city in cities_list" :key="city.id" :value=city.id>{{city.city_name}}</option>
                    </select>
                </slot>
            </div>

            <div class="modal-footer">
                <slot name="footer">
                <button class="modal-default-button" @click="$emit('close')">
                    Cancelar
                </button>
                <button class="modal-default-button" @click="validar">
                    ok
                </button>
                </slot>
            </div>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'editmodal',
  props: {
    user_data: Object,
    industries: Array,
    regions: Array,
    provincies: Array,
    countries: Array,
    cities: Array
  },
  data () {
    return {
      user_validated: {
        address_description: this.user_data.address_description,
        address_id: this.user_data.address_id,
        city_id: this.user_data.city_id,
        company_name: this.user_data.company_name,
        commercial_name: this.user_data.commercial_name,
        company_id: this.user_data.company_id,
        country_id: this.user_data.country_id,
        email: this.user_data.email,
        industry_id: this.user_data.industry_id,
        postal_code: this.user_data.postal_code,
        province_id: this.user_data.province_id,
        region_id: this.user_data.region_id,
        tax_number: this.user_data.tax_number,
        user_id: this.user_data.user_id,
        status_id: this.user_data.status_id,
        website: this.user_data.website,
        telephone: 99,
        firstname: this.user_data.firstname,
        lastname: this.user_data.lastname
      },
      province_list: this.provincies,
      region_list: this.regions,
      cities_list: this.cities
    }
  },
  watch: {
    'user_validated.region_id' () {
      console.log(this.user_validated.region_id)
      this.province_list = []
      this.cities_list = []
      this.user_validated.province_id = ''
      this.user_validated.city_id = ''
      if (this.user_validated.region_id > 0) {
        this.province_list = this.provincies.filter(prov => {
          return parseInt(prov.region_id) === parseInt(this.user_validated.region_id)
        })
      }
    },
    'user_validated.province_id' () {
      console.log(this.user_validated.province_id)
      this.cities_list = []
      this.user_validated.city_id = ''
      if (this.user_validated.province_id > 0) {
        this.cities_list = this.cities.filter(citys => {
          return parseInt(citys.province_id) === parseInt(this.user_validated.province_id)
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    validar () {
      let me = this
      me.axios.post('http://127.0.0.1:8000/api/buyers/validation', this.user_validated)
        .then(function (response) {
          console.log(response)
          me.close()
          me.$parent.$options.methods.fetchAuditions()
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 80%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

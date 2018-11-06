<template>
    <div class="component">
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <h3> Datos del usuario </h3>
                <label class="checkbox-inline" v-if="companyData.enable == true">
                    Bloquear usuario <br />
                    <a @click="editEnable(false)" data-toggle="tooltip" title="Bloquear usuario">
                        <i class="fas fa-lock fa-2x"></i>
                    </a><br />
                </label>
                <label class="checkbox-inline" v-else-if="companyData.enable == false">
                    Desbloquear usuario<br />
                    <a @click="editEnable(true)" data-toggle="tooltip" title="Desbloquear usuario">
                        <i class="fas fa-unlock fa-2x"></i>
                    </a><br />
                </label>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p> <strong> Nombre empresa: </strong> <br />{{companyData.company_name}} </p> <br />
                <p><strong>Correo electronico</strong> <br /> {{companyData.email}}</p>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p> <strong> Nombre comercial: </strong> <br />{{companyData.commercial_name}} </p> <br />
                <p> <strong> Persona de contacto:  </strong> <br /> {{companyData.name}} </p>
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p> <strong> No. de ID tributaria: </strong> <br />{{companyData.tax_number}} </p> <br />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <img src="https://auth-media.s3.amazonaws.com/media/organization_718/logo.jpg" alt="companylogo.png">
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Direccion: <br /><strong>{{companyData.address_description}}</strong> </p> <br />
                <p>  Pais: <br /><strong>Republica Dominicana</strong> </p> <br />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Ciudad: <br /><strong>{{companyData.city_name}}</strong> </p> <br />
                <p>  Zona horaria: <br /><strong>{{companyData.format}}</strong> </p> <br />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Region: <br /><strong>{{companyData.region_name}}</strong> </p> <br />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <button class="btn btn-secondary" type="button"> Ver Sucursales </button> <br />
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Telefonos: <br /><strong>{{companyData.telephone}}</strong> </p> <br />
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <input type="checkbox" id="checkbox" checked v-if="companyData.public_check==true" disabled>
                <input type="checkbox" id="checkbox" v-else>
                <label for="checkbox">Remover proveedores del cliente de licitaciones publicas</label> <br />

                <input type="checkbox" id="checkbox" checked v-if="companyData.public_check==true" disabled>
                <input type="checkbox" id="checkbox" v-else>
                <label for="checkbox">No participar en licitaciones publicas</label>
            </div>
        </div>
        <div class="dropdown-divider"></div>
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Plan: <br /></p> <br />
            </div>
            <div class="col-sm-12 col-md-12 col-lg-3">
                <p>  Nombre del plan: <br />
                <strong> Plan Gold </strong> </p>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  name: 'buyerdata',
  props: {
    companyData: Object
  },
  data () {
    return {
      company_data: this.companyData
    }
  },
  methods: {
    editEnable (evalue) {
      let me = this
      var option = {
        name: 'enable',
        value: evalue,
        id: this.companyData.id
      }
      this.axios.post('http://127.0.0.1:8000/api/buyers/info', option)
        .then(function (response) {
          me.companyData.enable = evalue
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>

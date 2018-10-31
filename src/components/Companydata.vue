<template>
    <div class="component">
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <h3> Datos del usuario </h3> <br />
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
            <ul>
                <li>
                  {{companyData.category_name}}
                </li>
            </ul>
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
                <input type="checkbox" id="checkbox" v-else-if="companyData.public_check==false" disabled>
                <label for="checkbox">Participar en licitaciones publicas</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    companyData: Object
  }
}
</script>

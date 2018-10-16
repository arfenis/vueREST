<template>
    <div class="component">
        <div class="row">
            <div class="col-xs-12 col-sm-6">
                <h2> Datos del usuario </h2> <br />
                <p> <strong> Nombre empresa: </strong> {{companyData.company_name}} </p> <br />
                <p> No. de ID tributaria: {{companyData.tax_number}} </p>
                <input type="checkbox" id="checkbox" checked v-if="companyData.public_check==true" disabled>
                <input type="checkbox" id="checkbox" v-else-if="companyData.public_check==false" disabled>
                <label for="checkbox">Participar en licitaciones publicas</label>
            </div>
        <ul>
            <li>
                {{companyData.category_name}}
            </li>
        </ul>
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

<template>
    <div class="component">
        <h1>The User Component</h1>
        <div class="row">
            <div class="col-xs-12 col-sm-6" v-if="menu==1">
                <providerdata :myName="name"></providerdata>
            </div>
            <div v-if="menu==2">
                <providerdetails> </providerdetails>
            </div>
        </div>
    </div>
</template>

<script>
import Providerdata from './Providerdata.vue'
import Providerdetails from './Providerdetails.vue'

export default {
  data: function () {
    return {
      menu: 2,
      name: 'Lucas'
    }
  },
  components: {
    providerdata: Providerdata,
    providerdetails: Providerdetails
  }
}

</script>

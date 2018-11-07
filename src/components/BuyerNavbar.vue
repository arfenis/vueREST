<template>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div class="navbar" id="navbarsExample09">
                  <ul class="nav nav-tabs">
                    <li class="nav-item nav-link">
                      <router-link :to="{ name: 'buyeregistered'}">
                          Registrados
                      </router-link>
                    </li>
                    <li class="nav-item nav-link">
                      <router-link :to="{ name: 'buyerpendings'}">
                          Pendientes
                      </router-link>
                    </li>
                    <li class="nav-item nav-link">
                          Borrados
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
</template>

<script>
export default {
  name: 'buyer-navbar',
  props: {
    menu: Number
  }
}
</script>

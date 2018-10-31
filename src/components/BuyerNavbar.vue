<template>
          <div class="row">
            <div class="col-sm-12 col-md-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
                <div class="navbar" id="navbarsExample09">
                  <ul class="nav nav-tabs">
                    <li class="nav-item" @click="menu = 1">
                      <a class="nav-link">Registrados</a>
                    </li>
                    <li class="nav nav-tabs" @click="menu = 2">
                      <a class="nav-link">Pendientes</a>
                    </li>
                    <li class="nav-item" @click="menu = 3">
                      <a class="nav-link">Borrados</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
</template>

<script>
export default {
  props: {
    menu: Number
  }
}
</script>

<template>
  <div id="app">
    <Providerauditions></Providerauditions>
  </div>
</template>

<script>
import Providerauditions from './components/Providerauditions'
import Providerdetails from './components/Providerdetails'
import Buyerauditions from './components/Buyerauditions'

export default {
  name: 'App',
  components: {
    Providerauditions, Providerdetails, Buyerauditions
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import Home from "./views/home.vue";

@Component({
  components: {
    Home
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap");
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

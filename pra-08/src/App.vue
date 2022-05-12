<template>
  <div id="app">
    <NavBar />
    <transition name="bounce">
      <router-view />
    </transition>
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { NavBar },
};
</script>

<style>
@import "vue2-animate/dist/vue2-animate.min.css";
</style>




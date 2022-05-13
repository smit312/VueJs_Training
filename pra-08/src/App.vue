<template>
  <div id="app">
    <NavBar />
    <transition name="bounce">
      <router-view apper :key="$router.path" />
    </transition>
  </div>
</template>

<script>
import NavBar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { NavBar },
  mounted() {
    if (this.$cookies.get("authUser")) {
      this.$store.commit("auth/isAuth", true);
    } else {
      this.$store.commit("auth/isAuth", false);
    }
  },
};
</script>

<style>
@import "vue2-animate/dist/vue2-animate.min.css";
</style>




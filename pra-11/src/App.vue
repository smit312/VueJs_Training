<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  mounted() {
    if (this.$cookies.get("authUser")) {
      this.$store.commit("auth/isAuth", true);
    } else {
      this.$store.commit("auth/isAuth", false);
    }
  },
};
</script>

<template>
  <div style="background-color: #141c2f; color: white">
    <Homecomponent />
    <hr />
    <router-view> </router-view>
  </div>
</template>

<script>
import Homecomponent from "./components/HomeComponent.vue";
// import UserForm from "./components/UserForm.vue";
export default {
  name: "App",
  components: {
    Homecomponent,
  },
};
</script>
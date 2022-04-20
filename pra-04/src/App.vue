<template>
  <div style="background-color: #141c2f; color: white">
    <Homecomponent />
  </div>
</template>

<script>
import Homecomponent from "./components/HomeComponent.vue";

export default {
  name: "App",
  components: {
    Homecomponent,
  },
};
</script>

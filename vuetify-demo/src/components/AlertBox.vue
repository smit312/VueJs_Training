<template>
  <v-alert :type="this.variant" dismissible>{{ this.content }} </v-alert>
</template>

<script>
export default {
  name: "AlertBox",
  props: ["variant", "content", "show"],
};
</script>

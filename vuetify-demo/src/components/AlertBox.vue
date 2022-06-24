<template>
  <v-alert
    :type="this.variant"
    dismissible
    @dismissed="showDismissibleAlert = false"
    >{{ this.content }}
  </v-alert>
</template>


<script>
export default {
  name: "AlertBox",
  props: ["variant", "content", "show"],
};
</script>

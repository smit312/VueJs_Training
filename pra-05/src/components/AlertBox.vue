<template>
  <b-alert
    :variant="this.variant"
    dismissible
    fade
    :show="this.show === 'true'"
    @dismissed="showDismissibleAlert = false"
  >
    {{ this.content }}
  </b-alert>
</template>


<script>
export default {
  name: "AlertBox",
  props: ["variant", "content", "show"],
};
</script>

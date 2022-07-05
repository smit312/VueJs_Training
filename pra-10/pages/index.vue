<template>
  <div></div>
</template>

<script>
import { defineComponent, onMounted, useStore } from "@nuxtjs/composition-api";

export default defineComponent({
  middleware: ["auth", "notAuth"],
  setup(_, context) {
    const store = useStore();
    onMounted(() => {
      if (context.root.$cookies.get("authUser")) {
        store.commit("auth/isAuth", true);
      } else {
        store.commit("auth/isAuth", false);
      }
    });
  },
});
</script>

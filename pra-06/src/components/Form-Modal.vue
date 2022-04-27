<template>
  <div>
    <transition name="rotate">
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Enter car Detail"
        hide-footer="true"
        @hide="onHideHandler"
      >
        <CarForm
          modalId="modal-prevent-closing"
          :formData="$props"
          v-on="$listeners"
        />
      </b-modal>
    </transition>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";

export default {
  components: { CarForm },
  props: ["formData"],
  data() {
    return {
      name: "FormModal",
    };
  },
  methods: {
    onHideHandler() {
      this.$parent.selectedCardData = {
        carId: "",
        carTitle: "",
        cardetails: "",
        carPrice: "",
        carImage: "",
      };
    },
  },
};
</script>
<style>
@import "vue2-animate/dist/vue2-animate.min.css";
</style>

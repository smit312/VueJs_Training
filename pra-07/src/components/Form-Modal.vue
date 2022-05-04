<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      modal-class="hidden"
      title="Enter car Detail"
      hide-footer="true"
      @shown="onShowModal"
      @hide="onHideHandler"
      no-fade
    >
      <CarForm
        modalId="modal-prevent-closing"
        :formData="$props"
        v-on="$listeners"
      />
    </b-modal>
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
    onShowModal() {
      let m = document.getElementById("modal-prevent-closing");
      m.classList.remove("hidden");
      m.classList.add("slideInUp");
      m.classList.add("animated");
    },
  },
};
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>

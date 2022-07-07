<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      modal-class="hidden"
      title="Enter car Detail"
      hide-footer
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
import { defineComponent, ref, reactive } from "@nuxtjs/composition-api";

export default defineComponent({
  components: { CarForm },
  props: ["formData"],
  setup() {
    let selectedCardData = reactive({
      carId: "",
      carTitle: "",
      cardetails: "",
      carPrice: "",
      carImage: "",
    });
    function onHideHandler() {
      selectedCardData = {
        carId: "",
        carTitle: "",
        cardetails: "",
        carPrice: "",
        carImage: "",
      };
    }
    function onShowModal() {
      let m = document.getElementById("modal-prevent-closing");
      m.classList.remove("hidden");
      m.classList.add("slideInUp");
      m.classList.add("animated");
    }
    return { onHideHandler, onShowModal, selectedCardData };
  },
});
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>

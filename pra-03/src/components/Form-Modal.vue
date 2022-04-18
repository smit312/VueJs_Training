<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Enter car Detail"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      hide-footer="true"
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
};
</script>

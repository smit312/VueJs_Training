<template>
  <ValidationObserver ref="observer">
    <b-form
      ref="form"
      slot-scope="{ validate }"
      @submit.prevent="validate().then(handleSubmit)"
    >
      <ValidationProvider rules="required|alpha" name="carName">
        <b-form-group
          label="CarName"
          slot-scope="{ valid, errors }"
          label-for="name-input"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="carItem.carName"
            type="text"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Enter car name"
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required|min:30|max:120 " name="carDetails">
        <b-form-group
          label="CarDetails"
          label-for="detail-input"
          invalid-feedback="Details between 30 to 130 character"
          slot-scope="{ valid, errors }"
          :state="nameState"
        >
          <b-form-textarea
            id="detail-input"
            v-model="carItem.carDetails"
            :state="errors[0] ? false : valid ? true : null"
            required
          ></b-form-textarea>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required" name="carImgURL">
        <b-form-group
          label="ImageURL"
          label-for="url-input"
          invalid-feedback="Must be url"
          :state="nameState"
          slot-scope="{ valid, errors }"
        >
          <b-form-input
            id="url-input"
            v-model="carItem.carImgURL"
            :state="errors[0] ? false : valid ? true : null"
            type="url"
            required
          ></b-form-input>
          <b-form-invalid-feedback>
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>
      <ValidationProvider rules="required|integer" name="carPrice">
        <b-form-group
          label="Price"
          label-for="Price"
          invalid-feedback="Price is required"
          :state="nameState"
          slot-scope="{ valid, errors }"
        >
          <b-form-input
            id="Price"
            v-model="carItem.carPrice"
            :state="errors[0] ? false : valid ? true : null"
            required
          ></b-form-input>
        </b-form-group>
      </ValidationProvider>
      <b-button
        type="submit"
        variant="primary"
        :class="{ shake: disabledButton }"
        @click="onButtonAnimate"
        >Submit</b-button
      >
    </b-form>
  </ValidationObserver>
</template>
<script>
export default {
  name: "CarForm",
  props: ["modalId", "formData"],
  data() {
    return {
      carItem: {
        carId: this.formData.formData.carId || "",
        carName: this.formData.formData.carName || "",
        carDetails: this.formData.formData.carDetails || "",
        carImgURL: this.formData.formData.carImgURL || "",
        carPrice: this.formData.formData.carPrice || "",
      },
      formModalId: this.modalId,
      disabledButton: false,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("submittedFormData", this.carItem);
      this.$bvModal.hide(this.formModalId);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    onButtonAnimate() {
      this.disabledButton = true;
      setTimeout(() => {
        this.disabledButton = false;
      }, 1500);
    },
  },
};
</script>       
<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

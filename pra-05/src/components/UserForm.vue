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
      <!-- ------------------------------ -->
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
      <!-- ------------------------------ -->
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
      <!-- ------------------------------ -->
      <ValidationProvider rules="required|integer" name="carPrice">
        <b-form-group
          label="Price"
          label-for="Price"
          invalid-feedback="Name is required"
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
      <b-button block type="submit" variant="primary">Submit</b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "userForm",
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
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log("clicked");
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
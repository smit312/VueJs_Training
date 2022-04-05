<template>
  <div>
    <NavBar />
    <div
      class="row p-5"
      style="display:flex align-item: stretch bakground-color:black; "
    >
      <GalleryCard
        v-for="car in cars"
        :key="car.id"
        :carTitle="car.heading"
        :carImage="car.image"
        :cardetails="car.details"
        :price="car.price"
        @CarPrice="CarPrice"
      />
      <b-button v-b-modal.modal-prevent-closing>Add Car</b-button>
      <!-- start modal -->
      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        title="Enter car Detail"
        hide-footer="true"
      >
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
            <ValidationProvider
              rules="required|min:30|max:120 "
              name="carDetails"
            >
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
      </b-modal>
      <!-- end modal -->
    </div>
  </div>
</template>

<script>
import NavBar from "./Navbar.vue";
import GalleryCard from "./GalleryCard.vue";
import CarData from "../assets/Data/CarData.json";
export default {
  name: "HomeComponent",
  components: {
    NavBar,
    GalleryCard,
  },
  props: ["modalId"],
  data() {
    return {
      carItem: {
        carName: "",
        carDetails: "",
        carImgURL: "",
        carPrice: "",
      },
      cars: CarData,
      formModalId: this.modalId,
      submittedNames: [],
    };
  },

  methods: {
    CarPrice(price) {
      alert(`Car Price : ${price}`);
    },

    // checkFormValidity() {
    //   const valid = this.$refs.form.checkValidity();
    //   this.nameState = valid;
    //   console.log(this.name);
    //   return valid;
    // },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    // handleOk(bvModalEvt) {
    //   // Prevent modal from closing
    //   bvModalEvt.preventDefault();
    //   // Trigger submit handler
    //   this.handleSubmit();
    // },
    handleSubmit() {
      // Exit when the form isn't valid
      console.log(this.carItem);
      this.$bvModal.hide("modal-prevent-closing");
      this.$root.$emit("form-data", this.carItem);
      this.submittedNames.push(this.name);
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
    // Push the name to submitted names
    // this.submittedNames.push(this.name);
    // console.log(this.name);
    // // Hide the modal manually
    // this.$nextTick(() => {
    //   this.$bvModal.hide("modal-prevent-closing");
    //     });
    //   },
  },
};
</script>

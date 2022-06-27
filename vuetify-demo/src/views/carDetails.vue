<template>
  <div>
    <div>
      <AlertBox
        v-if="this.isLoading == false && this.successmsg !== ''"
        variant="success"
        show="true"
        :content="this.successmsg"
      />
      <AlertBox
        v-if="this.isLoading === false && this.errmsg !== ''"
        showAlert="true"
        alertVariant="danger"
        :alertMessage="this.errmsg"
      />
    </div>
    <div class="d-flex justify-content- mt-5">
      <transition name="bounce">
        <FormModal
          :formData="selectedCardData"
          @submittedFormData="handleSubmittedData"
        />
      </transition>
      <v-card max-width="300">
        <v-img height="240" :src="this.$store.state.cars.carData.image"></v-img>

        <v-card-title>{{ this.$store.state.cars.carData.name }}</v-card-title>

        <v-card-text>
          <div class="my-4 text-subtitle-1">
            ₹ • {{ this.$store.state.cars.carData.price }}
          </div>

          <div>
            {{ this.$store.state.cars.carData.details }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-actions>
          <v-btn to="/" color="deep-purple lighten-2" text>
            Back to Home
          </v-btn>
          <v-btn color="deep-purple lighten-2" text @click="deleteCard">
            Delete
          </v-btn>

          <v-btn color="deep-purple lighten-2" text @click="editCard">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import AlertBox from "../components/AlertBox.vue";
import FormModal from "../components/Form-Modal.vue";
export default {
  name: "CarDetailsPage",
  components: { AlertBox, FormModal },

  data() {
    return {
      cars: [],
      formModalId: this.modalId,
      selectedCardData: {
        carId: "",
        carName: "",
        carDetails: "",
        carPrice: "",
        carImgURL: "",
      },
      submittedNames: [],
      carData: {
        image: "",
        name: "",
        details: "",
        price: "",
      },
      isLoading: false,
      errmsg: "",
      successmsg: "",
    };
  },
  methods: {
    async getCarData(id) {
      this.isLoading = true;
      let res = await this.$store.dispatch("cars/getCarData", id);
      if (res === "success") {
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.errmsg = "oops! somthing went wrong";
      }
    },
    async handleSubmittedData(carItem) {
      if (carItem.carId !== "") {
        await this.updateCarData(carItem);
        await this.getCarData(carItem.carId);
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
    },
    editCard() {
      this.selectedCardData = {
        carId: this.$store.state.cars.carData.id,
        carName: this.$store.state.cars.carData.name,
        carDetails: this.$store.state.cars.carData.details,
        carPrice: this.$store.state.cars.carData.price,
        carImgURL: this.$store.state.cars.carData.image,
      };
      this.$bvModal.show("modal-prevent-closing");
    },
    async updateCarData(data) {
      let res = await this.$store.dispatch("cars/updateCar", data);
      if (res === "sucess") {
        this.successmsg = "car data updated successfully";
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
    },
    async deleteCard() {
      let res = await this.$store.dispatch(
        "cars/deleteCarData",
        this.$store.state.cars.carData.id
      );
      if (res === "success") {
        this.successmsg = "car data delete successfully";
        this.$router.push({ name: "home" });
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
      await this.getCarData(this.$store.state.cars.carData.id);
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.getCarData(id);
  },
};
</script>

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
      <b-card
        :title="this.$store.state.cars.carData.name"
        :img-src="this.$store.state.cars.carData.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 30rem"
        class="mb-2"
      >
        <b-card-text>
          {{ this.$store.state.cars.carData.details }}
        </b-card-text>
        <b-card-text>
          price : {{ this.$store.state.cars.carData.price }}
        </b-card-text>
        <b-button
          to="/"
          pill
          style="background-color: #1f2a48"
          variant="outline-light"
          >Back to homepage</b-button
        >
        <b-button
          @click="deleteCard"
          pill
          style="background-color: #1f2a48"
          variant="outline-light"
          >delete</b-button
        >
        <b-button
          @click="editCard"
          pill
          style="background-color: #1f2a48"
          variant="outline-light"
          >edit</b-button
        >
      </b-card>
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
        this.errmsg = res;
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
        this.successmsg = res;
      } else {
        this.errmsg = res;
      }
    },
    async deleteCard() {
      let res = await this.$store.dispatch(
        "cars/deleteCarData",
        this.$store.state.cars.carData.id
      );
      if (res === "success") {
        this.successmsg = res;
        this.$router.push({ name: "home" });
      } else {
        this.errmsg = res;
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

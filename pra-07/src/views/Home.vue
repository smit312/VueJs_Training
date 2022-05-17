<template>
  <div class="container">
    <div>
      <AlertBox
        v-if="this.isLoading == false && this.successmsg !== ''"
        variant="success"
        show="true"
        :content="this.successmsg"
      />
      <AlertBox
        v-else-if="this.isLoading == false && this.errmsg !== ''"
        variant="danger"
        show="true"
        :content="this.errmsg"
      />
    </div>
    <b-row>
      <GalleryCard
        v-for="car in this.$store.state.cars.cars"
        :key="car.id"
        :cardId="car.id"
        :carTitle="car.name"
        :carImage="car.image"
        :cardetails="car.details"
        :price="car.price"
        @CarInfo="CarInfo"
        @editCard="editCard(car)"
        @deleteCard="deleteCard(car)"
      />
      <transition name="bounce">
        <FormModal
          :formData="selectedCardData"
          @submittedFormData="handleSubmittedData"
        />
      </transition>
    </b-row>
  </div>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import FormModal from "../components/Form-Modal.vue";
import AlertBox from "../components/AlertBox.vue";
export default {
  name: "HomeComponent",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  props: ["modalId"],
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
      isLoading: false,
      errmsg: "",
      successmsg: "",
    };
  },

  methods: {
    CarInfo(id) {
      this.$router.push({
        name: "cardetails",
        params: {
          carId: id,
        },
      });
    },
    editCard(car) {
      this.selectedCardData = {
        carId: car.id,
        carName: car.name,
        carDetails: car.details,
        carPrice: car.price,
        carImgURL: car.image,
      };
      this.$bvModal.show("modal-prevent-closing");
    },
    async deleteCard(data) {
      let res = await this.$store.dispatch("cars/deleteCarData", data.id);
      if (res === "success") {
        this.successmsg = res;
      } else {
        this.errmsg = res;
      }
      await this.getData();
    },
    async handleSubmittedData(carItem) {
      if (carItem.carId !== "") {
        await this.updateCarData(carItem);
        await this.getData();
      } else {
        await this.addcarData(carItem);
        await this.getData();
      }
    },
    async addcarData(data) {
      let res = await this.$store.dispatch("cars/addCar", data);
      if (res === "success") {
        this.successmsg = res;
      } else {
        this.errmsg = res;
      }
    },
    async getData() {
      let res = await this.$store.dispatch("cars/getCarsData");
      if (res !== "success") {
        this.errmsg = res;
      }
    },
    formatFetchedData(data) {
      this.cars = data.map((item) => {
        return {
          id: item.id,
          heading: item.name,
          image: item.image,
          details: item.details,
          price: item.price,
        };
      });
    },
    async updateCarData(data) {
      let res = await this.$store.dispatch("cars/updateCar", data);
      if (res === "sucess") {
        this.successmsg = res;
      } else {
        this.errmsg = res;
      }
    },
  },
  async mounted() {
    this.getData();
  },
};
</script>


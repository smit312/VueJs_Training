<template>
  <section>
    <v-container>
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
      <v-row class="pt-3 justify-content-md-center d-flex">
        <v-col
          cols="3"
          class="d-flex align-items-stretch flex-wrap"
          style="max-width: 100%; justify-content: space-evenly"
        >
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
        </v-col>
      </v-row>
      <FormModal />
    </v-container>
  </section>
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
      submittedNames: [],
      isLoading: false,
      errmsg: "",
      successmsg: "",
    };
  },
  computed: {
    selectedCardData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
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
      let selectedCardData = {
        carId: car.id,
        carName: car.name,
        carDetails: car.details,
        carPrice: car.price,
        carImgURL: car.image,
      };
      this.$store.commit("cars/setSelectedCarData", selectedCardData);
      this.$store.commit("ui/openDialog", { type: "edit" });
    },
    async deleteCard(data) {
      let res = await this.$store.dispatch("cars/deleteCarData", data.id);
      if (res === "success") {
        this.successmsg = "car data delete successfully";
      } else {
        this.errmsg = "oops! somthing went wrong";
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
      let res = await this.$store.dispatch("addcar/addCar", data);
      if (res === "success") {
        this.successmsg = "car data added successfully using action";
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
    },
    async getData() {
      let res = await this.$store.dispatch("cars/getCarsData");
      if (res !== "success") {
        this.errmsg = "oops! somthing went wrong";
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
        this.successmsg = "car data updated successfully";
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
    },
  },
  async mounted() {
    this.getData();
  },
};
</script>


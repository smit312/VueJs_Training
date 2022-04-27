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
    <b-row class>
      <GalleryCard
        v-for="car in cars"
        :key="car.id"
        :cardId="car.id"
        :carTitle="car.heading"
        :carImage="car.image"
        :cardetails="car.details"
        :price="car.price"
        @CarInfo="CarInfo"
        @editCard="editCard(car)"
        @deleteCard="deleteCard(car)"
      />

      <FormModal
        :formData="selectedCardData"
        @submittedFormData="handleSubmittedData"
      />
    </b-row>
  </div>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import FormModal from "../components/Form-Modal.vue";
import axios from "axios";
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
        carName: car.heading,
        carDetails: car.details,
        carPrice: car.price,
        carImgURL: car.image,
      };
      this.$bvModal.show("modal-prevent-closing");
    },
    async deleteCard(data) {
      await this.deleteCarData(data);
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
      this.isLoading = true;
      await axios
        .post(`https://testapi.io/api/dartya/resource/cardata`, {
          name: data.carName,
          details: data.carDetails,
          image: data.carImgURL,
          price: data.carPrice,
        })
        .then(() => {
          this.isLoading = false;
          this.successmsg = "car data added successfully!";
          this.showAlert();
        })
        .catch(() => {
          this.isLoading = false;
          this.errmsg = "oops! somthing went wrong";
        });
    },
    async getData() {
      await axios
        .get(`https://testapi.io/api/dartya/resource/cardata`)

        .then((res) => {
          if (res && res.data && res.data.data)
            this.formatFetchedData(res.data.data);
        })
        .catch(() => {
          this.showAlert();
        });
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
      this.isLoading = true;
      await axios
        .put(`https://testapi.io/api/dartya/resource/cardata/${data.carId}`, {
          name: data.carName,
          details: data.carDetails,
          image: data.carImgURL,
          price: data.carPrice,
        })
        .then(() => {
          this.isLoading = false;
          this.successmsg = "car data updated successfully";
        })
        .catch(() => {
          this.errmsg = "oops! somthing went wrong";
        });
    },
    async deleteCarData(data) {
      this.isLoading = true;
      await axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${data.id}`)
        .then(() => {
          this.isLoading = false;
          this.successmsg = "car data delete successfully";
        })
        .catch(() => {
          this.errmsg = "oops! somthing went wrong";
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>


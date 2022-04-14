<template>
  <div class="container">
    <NavBar />
    <div>
      <alert-box
        v-if="this.isLoading == false && this.successmsg !== ''"
        variant="success"
        show="true"
        :content="this.successmsg"
      />
      <alert-box
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
        @CarPrice="CarPrice"
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
import NavBar from "./Navbar.vue";
import GalleryCard from "./GalleryCard.vue";
import FormModal from "./Form-Modal.vue";
import axios from "axios";
import AlertBox from "./AlertBox.vue";
export default {
  name: "HomeComponent",
  components: {
    NavBar,
    GalleryCard,
    FormModal,
    AlertBox,
  },
  props: ["modalId"],
  data() {
    return {
      dismissSecs: 5,
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
    CarPrice(price) {
      alert(`Car Price : ${price}`);
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
      console.log(car);
    },
    async deleteCard(data) {
      await this.deleteCarData(data);
      await this.getData();
      // alert("Deleted : " + data.heading);
      //
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
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.successmsg = "car data added successfully!";
          this.showAlert();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
          this.errmsg = "oops! somthing went wrong";
        });
    },
    async getData() {
      await axios
        .get(`https://testapi.io/api/dartya/resource/cardata`)
        .then((res) => {
          this.formatFetchedData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
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
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.successmsg = "car data updated successfully";
        })
        .catch((err) => {
          console.log(err);
          this.errmsg = "oops! somthing went wrong";
          // alert(err);
        });
    },
    async deleteCarData(data) {
      this.isLoading = true;
      await axios
        .delete(`https://testapi.io/api/dartya/resource/cardata/${data.id}`)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.successmsg = "car data delete successfully";
        })
        .catch((err) => {
          console.log(err);
          this.errmsg = "oops! somthing went wrong";
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

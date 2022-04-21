<template>
  <div>
    <div class="d-flex justify-content-center mt-5">
      <div>
        <AlertBox
          v-if="this.isLoading === false && this.errmsg !== ''"
          showAlert="true"
          alertVariant="danger"
          :alertMessage="this.errmsg"
        />
      </div>
      <b-card
        :title="this.carData.name"
        :img-src="this.carData.image"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 30rem"
        class="mb-2"
      >
        <b-card-text>
          {{ this.carData.details }}
        </b-card-text>
        <b-card-text> price : {{ this.carData.price }} </b-card-text>

        <b-button href="#" variant="primary">Back to homepage</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AlertBox from "../components/AlertBox.vue";
export default {
  name: "CarDetailsPage",
  components: { AlertBox },
  data() {
    return {
      carData: {
        image: "",
        name: "",
        details: "",
        price: "",
      },
      isLoading: false,
      errmsg: "",
    };
  },
  methods: {
    async getCarData(id) {
      this.isLoading = true;
      await axios
        .get(`https://testapi.io/api/dartya/resource/cardat/${id}`)
        .then((res) => {
          this.isLoading = false;
          if (res && res.data) {
            this.carData = {
              image: res.data.image,
              name: res.data.name,
              details: res.data.details,
              price: res.data.price,
            };
            this.errmsg = "";
          } else {
            this.errmsg = "Oops, something went wrong!";
          }
        })
        .catch(() => {
          this.isLoading = false;
          this.errmsg = "Oops, something went wrong!";
        });
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.getCarData(id);
  },
};
</script>
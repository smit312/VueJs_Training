<template>
  <div>
    <div class="d-flex justify-content- mt-5">
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
      <b-card
        :title="this.carData.name"
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
      </b-card>
    </div>
  </div>
</template>

<script>
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
        console.log(res);
        this.isLoading = false;
        this.errmsg = "oops! somthing went wrong";
      }
    },
  },
  created() {
    const id = this.$route.params.carId;
    this.getCarData(id);
  },
};
</script>

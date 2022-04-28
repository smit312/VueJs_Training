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
        .get(`https://testapi.io/api/dartya/resource/cardata/${id}`)
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
  },
  created() {
    const id = this.$route.params.carId;
    this.getCarData(id);
  },
};
</script>
<style>
.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}

button {
  margin: 20px;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}
/* 16 */
.btn-16 {
  border: none;
  color: #000;
}
.btn-16:after {
  position: absolute;
  content: "";
  width: 0;
  height: 100%;
  top: 0;
  left: 0;
  direction: rtl;
  z-index: -1;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  transition: all 0.3s ease;
}
.btn-16:hover {
  color: #000;
}
.btn-16:hover:after {
  left: auto;
  right: 0;
  width: 100%;
}
.btn-16:active {
  top: 2px;
}
</style>
<template>
  <div class="container">
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
        @showCarPrice="showCarPrice"
      />
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
  data() {
    return {
      cars: CarData,
    };
  },
  methods: {
    showCarPrice(price) {
      alert(`Car Price : ${price}`);
    },
  },
};
</script>

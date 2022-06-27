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
import HomeMixin from "../mixins/HomeMixin";
export default {
  name: "HomeComponent",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  mixins: [HomeMixin],
  async mounted() {
    this.$store.dispatch("cars/getCarsData");
  },
};
</script>


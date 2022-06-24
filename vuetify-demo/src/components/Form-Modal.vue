<template>
  <div>
    <v-dialog
      transition="dialog-bottom-transition"
      v-model="openDialog"
      max-width="500"
    >
      <v-card>
        <v-toolbar color="primary" dark>{{
          dialogType === "add" ? "add car data" : "edit car data"
        }}</v-toolbar>
        <v-card-text>
          <CarForm v-on="$listeners" />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CarForm from "./CarForm.vue";

export default {
  components: { CarForm },
  props: ["formData"],
  data() {
    return {
      name: "FormModal",
    };
  },
  computed: {
    openDialog() {
      return this.$store.getters["ui/getisDialogOpen"];
    },
    dialogType() {
      return this.$store.getters["ui/getDialogType"];
    },
  },

  methods: {
    closeDialog() {
      this.$store.commit("ui/closeDialog");
      let selectedCardData = {
        carId: "",
        carTitle: "",
        cardetails: "",
        carPrice: "",
        carImage: "",
      };
      this.$store.commit("cars/setSelectedCarData", selectedCardData);
    },
  },
};
</script>
<style>
@import "animate.css";
.hidden {
  display: none !important;
}
</style>

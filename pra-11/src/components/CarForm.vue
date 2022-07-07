<template>
  <div>
    <validation-observer ref="observer">
      <form @submit.prevent="handleSubmit">
        <center>
          <validation-provider
            rules="required|alpha_spaces"
            name="CarName"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="carItem.carName"
              :error-messages="errors"
              label="CarName"
              required
              type="text"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            rules="required|min:30|max:120"
            name="carDetails"
          >
            <v-text-field
              v-model="carItem.carDetails"
              :error-messages="errors"
              label="CarDetails"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider rules="required" name="carImgURL">
            <v-text-field
              v-model="carItem.carImgURL"
              id="url-input"
              label="ImageURL"
              type="url"
              :error-messages="errors"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider rules="required|integer" name="carPrice">
            <v-text-field
              label="Price"
              id="Price"
              v-model="carItem.carPrice"
              required
            ></v-text-field>
          </validation-provider>
          <v-btn class="mr-4" type="submit" :disabled="invalid">
            {{ formType === "add" ? "add car" : "edit car" }}
          </v-btn>
        </center>
      </form>
    </validation-observer>
  </div>
</template>
<script>
export default {
  name: "CarForm",
  props: ["modalId"],
  data() {
    return {
      carItem: {
        carId: this.$store.getters["cars/getSelectedCarData"].carId || "",
        carName: this.$store.getters["cars/getSelectedCarData"].carName || "",
        carDetails:
          this.$store.getters["cars/getSelectedCarData"].carDetails || "",
        carImgURL:
          this.$store.getters["cars/getSelectedCarData"].carImgURL || "",
        carPrice: this.$store.getters["cars/getSelectedCarData"].carPrice || "",
      },

      disabledButton: false,
    };
  },
  computed: {
    formType() {
      return this.$store.getters["ui/getDialogType"];
    },
    selectedData() {
      return this.$store.getters["cars/getSelectedCarData"];
    },
  },
  watch: {
    selectedData(newData) {
      this.carItem.carId = newData.carId;
      this.carItem.carName = newData.carName;
      this.carItem.carDetails = newData.carDetails;
      this.carItem.carImgURL = newData.carImgURL;
      this.carItem.carPrice = newData.carPrice;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.carItem.carId !== "") {
        let selectedCardData = {
          carId: this.carId,
          carName: this.carName,
          carDetails: this.carDetails,
          carImgURL: this.carImgURL,
          carPrice: this.carPrice,
        };
        await this.$store.dispatch("cars/updateCar", this.carItem);
        await this.$store.dispatch("cars/getCarsData");
        selectedCardData = {
          carId: this.carId,
          carName: this.carName,
          carDetails: this.carDetails,
          carImgURL: this.carImgURL,
          carPrice: this.carPrice,
        };
        this.$store.commit("cars/setSelectedCarData", selectedCardData);
      } else {
        await this.$store.dispatch("addcar/addCar", this.carItem);
        await this.$store.dispatch("cars/getCarsData");
      }
      this.$store.commit("ui/closeDialog");
    },
  },
};
</script>       

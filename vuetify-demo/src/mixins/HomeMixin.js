export default {
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
};

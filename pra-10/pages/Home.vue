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
    <b-row>
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
      <transition name="bounce">
        <FormModal
          :formData="this.selectedCardData"
          @submittedFormData="handleSubmittedData"
        />
      </transition>
    </b-row>
  </div>
</template>

<script>
import GalleryCard from "../components/GalleryCard.vue";
import FormModal from "../components/Form-Modal.vue";
import AlertBox from "../components/AlertBox.vue";
import {
  defineComponent,
  useRouter,
  ref,
  onMounted,
  useStore,
  reactive,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "HomeComponent",
  components: {
    GalleryCard,
    FormModal,
    AlertBox,
  },
  middleware: ["auth"],
  setup(_, context) {
    const store = useStore();
    const router = useRouter();
    const cars = ref([]);
    const selectedCardData = reactive({
      carId: "",
      carName: "",
      carDetails: "",
      carPrice: "",
      carImgURL: "",
    });
    const submittedNames = ref([]);
    let isLoading = ref(false);
    let errmsg = ref("");
    let successmsg = ref("");
    //methods
    function CarInfo(id) {
      router.push({
        name: "cardetails",
        params: {
          carId: id,
        },
      });
    }
    function editCard(car) {
      selectedCardData.carId = car.id;
      selectedCardData.carName = car.name;
      selectedCardData.carDetails = car.details;
      selectedCardData.carPrice = car.price;
      selectedCardData.carImgURL = car.image;
      context.root.$bvModal.show("modal-prevent-closing");
    }
    async function deleteCard(data) {
      let res = await store.dispatch("cars/deleteCarData", data.id);
      if (res === "success") {
        successmsg = res;
      } else {
        errmsg = res;
      }
      await getData();
    }
    async function handleSubmittedData(carItem) {
      if (carItem.carId !== "") {
        await updateCarData(carItem);
        await getData();
      } else {
        await addcarData(carItem);
        await getData();
      }
    }
    async function addcarData(data) {
      let res = await store.dispatch("cars/addCar", data);
      if (res === "success") {
        successmsg = res;
      } else {
        errmsg = res;
      }
    }
    async function getData() {
      let res = await store.dispatch("cars/getCarsData");
      if (res !== "success") {
        errmsg = res;
      }
    }
    function formatFetchedData(data) {
      cars = data.map((item) => {
        return {
          id: item.id,
          heading: item.name,
          image: item.image,
          details: item.details,
          price: item.price,
        };
      });
    }
    async function updateCarData(data) {
      let res = await store.dispatch("cars/updateCar", data);
      if (res === "sucess") {
        successmsg = res;
      } else {
        errmsg = res;
      }
    }
    onMounted(() => {
      getData();
    });
    return {
      isLoading,
      selectedCardData,
      CarInfo,
      errmsg,
      successmsg,
      deleteCard,
      editCard,
      handleSubmittedData,
      addcarData,
      getData,
      formatFetchedData,
      updateCarData,
    };
  },
});
</script>


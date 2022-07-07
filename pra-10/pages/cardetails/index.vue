<template>
  <div>
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
    <div class="d-flex justify-content- mt-5">
      <transition name="bounce">
        <FormModal
          :formData="this.selectedCardData"
          @submittedFormData="handleSubmittedData"
        />
      </transition>
      <b-card
        :title="this.$store.state.cars.carData.name"
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
        <b-button
          @click="deleteCard()"
          pill
          style="background-color: #1f2a48"
          variant="outline-light"
          >delete</b-button
        >
        <b-button
          @click="editCard"
          pill
          style="background-color: #1f2a48"
          variant="outline-light"
          >edit</b-button
        >
      </b-card>
    </div>
  </div>
</template>

<script>
import AlertBox from "~/components/AlertBox.vue";
import FormModal from "~/components/Form-Modal.vue";
import {
  ref,
  computed,
  defineComponent,
  useStore,
  useRoute,
  useRouter,
  reactive,
} from "@nuxtjs/composition-api";

export default defineComponent({
  name: "CarDetailsPage",
  components: { AlertBox, FormModal },
  middleware: ["auth"],
  setup(_, context) {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const cars = reactive([]);
    const formModalId = reactive({
      carId: "",
      carName: "",
      carDetails: "",
      carPrice: "",
      carImgURL: "",
    });
    let selectedCardData = reactive({
      carId: "",
      carName: "",
      carDetails: "",
      carPrice: "",
      carImgURL: "",
    });
    let submittedNames = reactive([]);
    let carData = reactive({
      image: "",
      name: "",
      details: "",
      price: "",
    });
    let isLoading = ref(false);
    let errmsg = ref("");
    let successmsg = ref("");

    const cData = computed(() => {
      return store.getters["cars/getCar"];
    });

    async function getCarData(id) {
      isLoading = true;
      let res = await store.dispatch("cars/getCarData", id);
      if (res === "success") {
        isLoading = false;
      } else {
        isLoading = false;
        errmsg = res;
      }
    }
    async function handleSubmittedData(carItem) {
      if (carItem.carId !== "") {
        await updateCarData(carItem);
        await getCarData(carItem.carId);
      } else {
        errmsg = "oops! somthing went wrong";
      }
    }
    function editCard() {
      selectedCardData = {
        carId: store.state.cars.carData.id,
        carName: store.state.cars.carData.name,
        carDetails: store.state.cars.carData.details,
        carPrice: store.state.cars.carData.price,
        carImgURL: store.state.cars.carData.image,
      };
      context.root.$bvModal.show("modal-prevent-closing");
    }
    async function updateCarData(data) {
      let res = await store.dispatch("cars/updateCar", data);
      if (res === "sucess") {
        successmsg = res;
      } else {
        errmsg = res;
      }
    }
    async function deleteCard() {
      let res = await store.dispatch("cars/deleteCarData", cData.value.id);
      if (res === "success") {
        successmsg = res;
        router.push("/Home");
        store.dispatch("cars/getCar");
      } else {
        errmsg = res;
      }
    }
    const id = ref(route.value.params.carId);
    store.dispatch("cars/getCarData", id.value);

    return {
      cars,
      formModalId,
      submittedNames,
      selectedCardData,
      carData,
      isLoading,
      errmsg,
      successmsg,
      deleteCard,
      updateCarData,
      editCard,
      handleSubmittedData,
      getCarData,
      cData,
    };
  },
});
</script>

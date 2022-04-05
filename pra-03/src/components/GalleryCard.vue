<script>
export default {
  name: "GalleryCard",
  props: ["cardId", "carTitle", "carImage", "cardetails", "price"],
  methods: {
    showDeleteCar: function () {
      alert(`Delete car sucessfully`);
    },
  },
};
</script>

<template>
  <div
    class="col-md-3 d-flex justify-between-center user-select-none"
    style="margin: 0"
  >
    <b-card
      class="mt-5 shadow p-3 mb-3 rounded position-relative"
      header-tag="header"
      style="background-color: #1f2a48"
      align="center"
      :title="carTitle"
    >
      <b-img
        style="width: auto; height: 10rem"
        :src="carImage"
        alt="Fluid-grow image"
      ></b-img>
      <b-card-title class="text-center"></b-card-title>
      <b-card-text class="mt-4 mb-5">{{ cardetails }}</b-card-text>
      <!-- <div> -->
      <b-button
        v-on:click="showDeleteCar()"
        style="background-color: #1f2a48"
        class="
          shadow-lg
          border-none
          position-absolute
          bottom-0
          start-0
          ms-5
          mb-3
          mr-2
          button-center
        "
        v-if="price != null"
      >
        delete
      </b-button>
      <b-button
        style="background-color: #1f2a48"
        class="
          shadow-lg
          border-none
          position-absolute
          bottom-0
          translate-middle
        "
        @click="$emit('CarPrice', price)"
        v-if="price != null"
      >
        Info
      </b-button>
      <b-button
        style="background-color: #1f2a48"
        class="
          shadow-lg
          border-none
          position-absolute
          bottom-0
          ms-1
          mb-3
          button-center
        "
        disabled
        v-else
      >
        available soon...
      </b-button>
      <b-button
        style="background-color: #1f2a48"
        class="shadow-lg border-none position-absolute bottom-0 end-0 mb-3 me-2"
        v-if="price != null"
      >
        edit
      </b-button>
      <!-- </div> -->
    </b-card>
  </div>
</template>
<style>
.button-center {
  transform: translateX(-50%);
}
</style>

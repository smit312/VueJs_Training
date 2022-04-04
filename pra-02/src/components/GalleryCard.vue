<script>
export default {
  name: "GalleryCard",
  props: ["carTitle", "carImage", "cardetails", "price"],
};
</script>

<template>
  <div
    class="col-md-4 d-flex justify-between-center user-select-none"
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
      <b-button
        style="background-color: #1f2a48"
        class="
          shadow-lg
          border-none
          position-absolute
          bottom-0
          left-50
          mb-3
          button-center
        "
        @click="$emit('showCarPrice', price)"
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
          left-50
          mb-3
          button-center
        "
        disabled
        v-else
      >
        available soon...
      </b-button>
    </b-card>
  </div>
</template>
<style>
.button-center {
  transform: translateX(-50%);
}
</style>

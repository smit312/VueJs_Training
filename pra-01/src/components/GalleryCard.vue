<script>
import jsonData from "../assets/Data/CarData.json";
export default {
  name: "GalleryCard",
  data() {
    return {
      data: jsonData,
    };
  },

  methods: {
    hello(details) {
      alert(`Price :  ${details}`);
    },
  },
};
</script>


<template>
  <div>
    <b-container class="bv-example-row mb-3">
      <h2 class="text-center mt-3">car showroom</h2>
      <b-row cols="3">
        <div v-for="item in data" :key="item">
          <b-col>
            <b-card-group deck>
              <b-card
                class="
                  mt-5
                  border border-light
                  shadow
                  p-3
                  mb-5
                  bg-white
                  rounded
                "
                header-tag="header"
                align="center"
                :title="item.heading"
              >
                <b-img
                  style="max-width: 20rem"
                  :src="item.image"
                  alt="Fluid-grow image"
                ></b-img>
                <b-card-title class="text-center"></b-card-title>
                <b-card-text class="mt-4">{{ item.details }}</b-card-text>
                <b-button
                  href="#"
                  variant="primary"
                  class="text-center mt-3"
                  @click="hello(item.price)"
                  >Info
                </b-button>
              </b-card>
            </b-card-group>
          </b-col>
        </div>
      </b-row>
    </b-container>
  </div>
</template>


<style scoped>
</style>
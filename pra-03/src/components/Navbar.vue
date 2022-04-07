<template>
  <header
    class="pt-2 pb-2"
    style="background-color: #141c2f; border-bottom: 2px solid #1f2a48"
  >
    <h1 class="text-center text-light">
      {{ showRoomName }}
      <b-button
        v-b-modal.modal-prevent-closing
        style="background-color: #1f2a48"
        class="shadow-lg border-none bottom-0 start-0 ms-5 button-center"
        >Add Car</b-button
      >
    </h1>
  </header>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showRoomName: "Car Showroom",
    };
  },
};
</script>

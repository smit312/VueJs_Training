<template>
  <header
    class="pt-2 pb-2"
    style="background-color: #141c2f; border-bottom: 2px solid #1f2a48"
  >
    <h1 class="text-center text-light">
      {{ showRoomName }}
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

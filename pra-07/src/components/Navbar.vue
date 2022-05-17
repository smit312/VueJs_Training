 <template>
  <header
    class="pt-2 pb-2"
    style="background-color: #141c2f; border-bottom: 2px solid #1f2a48"
  >
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h1 class="text-light">
          {{ showRoomName }}
        </h1>
        <div class="text-right">
          <b-button
            variant="outline-light"
            pill
            v-b-modal.modal-prevent-closing
            style="background-color: #1f2a48"
            class="shadow-lg border-none bottom-0 start-0 ms-5"
            >Add Car</b-button
          >
          <router-link to="/">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              >Home
            </b-button></router-link
          >
          <router-link to="/login">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              >Login
            </b-button></router-link
          >
          <router-link to="/register">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              >Register
            </b-button></router-link
          >
        </div>
      </div>
    </div>
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


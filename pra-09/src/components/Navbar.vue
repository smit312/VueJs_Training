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
            v-if="this.isAuth"
            class="shadow-lg border-none bottom-0 start-0 ms-5"
            >Add Car</b-button
          >

          <router-link to="/">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              v-if="this.isAuth"
              >Home
            </b-button>
          </router-link>
          <router-link :to="{ name: 'userlogin' }">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              v-if="!this.isAuth"
              >Login
            </b-button></router-link
          >
          <router-link to="/register">
            <b-button
              variant="outline-light"
              pill
              style="background-color: #1f2a48"
              class="shadow-lg border-none bottom-0 start-0 ms-5"
              v-if="!this.isAuth"
              >Register
            </b-button></router-link
          >

          <b-dropdown
            id="dropdown-right"
            pill
            style="background-color: #1f2a48"
            class="shadow-lg border-none bottom-0 start-0 ms-5"
            :text="this.userData.email"
            v-if="this.isAuth"
          >
            <b-dropdown-item @click.prevent="logoutHandler"
              >Logout</b-dropdown-item
            >
          </b-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      showRoomName: "Car Showroom",
    };
  },
  computed: {
    ...mapGetters({
      isAuth: "auth/getisAuth",
      userData: "auth/getUser",
    }),
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("auth/UserLogout");
    },
  },
};
</script>

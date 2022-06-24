 <template>
  <div>
    <v-app-bar color="deep-black accent-4" dense dark min-width="300">
      <v-toolbar-title>{{ showRoomName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn plain v-if="this.isAuth" @click="openModal">Add Car</v-btn>

      <v-btn plain v-if="this.isAuth">Home</v-btn>
      <router-link to="/login">
        <v-btn plain v-if="!this.isAuth"> Login</v-btn>
      </router-link>
      <router-link to="/register">
        <v-btn plain v-if="!this.isAuth"> Register</v-btn>
      </router-link>

      <v-btn plain v-if="this.isAuth" @click.prevent="logoutHandler">
        Logout</v-btn
      >
    </v-app-bar>
  </div>
</template> 

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showRoomName: "Car Showroom",
    };
  },

  computed: {
    isAuth() {
      return this.$store.getters["auth/getisAuth"];
    },
    userData() {
      return this.$store.getters["auth/getUser"];
    },
  },
  methods: {
    openModal() {
      this.$store.commit("ui/openDialog", { type: "add" });
    },
    logoutHandler() {
      console.log("logout called");
      this.$store.dispatch("auth/UserLogout");
    },
  },
};
</script>


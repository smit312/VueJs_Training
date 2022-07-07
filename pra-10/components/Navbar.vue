  <template>
  <!-- <v-app-bar color="deep-black accent-4" dense dark min-width="300">
    <v-toolbar-title>{{ showRoomName }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn plain v-if="this.isAuth" @click="openModal">Add Car</v-btn>
    <v-btn plain v-if="this.isAuth">Home</v-btn>
    <v-btn plain v-if="!this.isAuth" to="/login"> Login</v-btn>
    <v-btn plain v-if="!this.isAuth" to="/register"> Register</v-btn>
    <v-btn plain v-if="this.isAuth" @click.prevent="logoutHandler">
      Logout</v-btn
    >
  </v-app-bar> -->

  <nav
    class="
      ps-5
      pe-5
      mt-0.5
      bg-dark
      d-flex
      justify-content-between
      align-items-center
    "
    style="height: 8vh"
  >
    <h1 class="text-center text-light">{{ showRoomName }}</h1>
    <div v-if="this.isAuth">
      <NuxtLink to="/Home" class="btn me-3 text-light fw-bold fs-5 nav_btn">
        Home
      </NuxtLink>
      <b-button
        variant="transparent"
        class="me-3 text-light fw-bold fs-5 nav_btn"
        v-b-modal.modal-prevent-closing
      >
        Add Car
      </b-button>
      <b-dropdown
        id="dropdown-right"
        right
        :text="this.userData.email"
        variant="dark"
        size="lg"
        class="text-light fw-bold fs-5 nav_btn"
      >
        <b-dropdown-item @click="this.logoutHandler">Logout</b-dropdown-item>
      </b-dropdown>
    </div>
    <div v-if="!this.isAuth">
      <NuxtLink
        to="/UserLogin"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Login
      </NuxtLink>
      <NuxtLink
        to="/UserRegister"
        class="btn me-3 text-light fw-bold fs-5 nav_btn"
      >
        Register
      </NuxtLink>
    </div>
  </nav>
</template>
  
<script>
import jwt_decode from "jwt-decode";
import {
  defineComponent,
  useStore,
  useRouter,
  onMounted,
  computed,
  ref,
} from "@nuxtjs/composition-api";
export default defineComponent({
  name: "NavBar",
  setup(_, context) {
    const store = useStore();
    const router = useRouter();
    const showRoomName = ref("Car Showroom");
    function logoutHandler() {
      context.root.$cookies.remove("authUser");
      store.commit("auth/isAuth", false);
      router.push("/UserLogin");
    }
    const isAuth = computed(() => {
      return store.getters["auth/getisAuth"];
    });
    const userData = computed(() => {
      return store.getters["auth/getUser"];
    });
    onMounted(() => {
      if (context.root.$cookies.get("authUser")) {
        store.commit("auth/isAuth", true);
        let userData = jwt_decode(context.root.$cookies.get("authUser"));
        store.commit("auth/setUserData", userData);
      } else {
        store.commit("auth/isAuth", false);
      }
    });
    return {
      showRoomName,
      logoutHandler,
      isAuth,
      userData,
    };
  },
});
</script>
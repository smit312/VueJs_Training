<template>
  <div>
    <AlertBox
      v-if="this.isLoading == false && this.successmsg !== ''"
      variant="success"
      show="true"
      :content="this.successmsg"
    />
    <AlertBox
      v-else-if="this.isLoading == false && this.errmsg !== ''"
      variant="danger"
      show="true"
      :content="this.errmsg"
    />

    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="onSubmit">
        <center>
          <h1>Login Page</h1>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="uEmail"
          >
            <v-text-field
              v-model="form.uEmail"
              :error-messages="errors"
              label="email"
              required
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            :rules="{
              required,
              regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
            }"
            name="uPassword"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="form.uPassword"
              :error-messages="errors"
              label="password"
              type="password"
              required
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>

          <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
          <v-btn @click="clear"> clear </v-btn>
        </center>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import AlertBox from "../components/AlertBox.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    AlertBox,
    ValidationObserver,
    ValidationProvider,
  },
  data: () => ({
    form: {
      uEmail: "",
      uPassword: "",
    },
    isLoading: false,
    errmsg: "",
    successmsg: "",
  }),

  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let res = await this.$store.dispatch("auth/loginUser", this.form);
      if (res === "success") {
        this.$router.push({ name: "home" });
      } else {
        this.errmsg = res;
      }
    },
    clear() {
      (this.form.uEmail = ""), (this.form.uPassword = "");
    },
  },
};
</script>

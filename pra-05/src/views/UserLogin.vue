<template>
  <div class="container">
    <ValidationObserver ref="observer">
      <b-form @submit="onSubmit">
        <center>
          <h1 class="mt-3">Login Page</h1>
          <ValidationProvider
            rules="required|email"
            name="uEmail"
            v-slot="{ errors }"
          >
            <b-form-group label="email" class="mb-2">
              <b-form-input
                v-model="form.uEmail"
                type="email"
                :state="errors[0] ? false : valid ? true : null"
                placeholder="Enter email"
                required
                class="w-50"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            :rules="{
              required,
              regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
            }"
            name="uPassword"
            v-slot="{ errors }"
          >
            <b-form-group label="password" class="mb-2">
              <b-form-input
                v-model="form.uPassword"
                type="password"
                :state="errors[0] ? false : valid ? true : null"
                placeholder="Enter password"
                required
                class="w-50"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>

          <b-button type="submit" variant="primary">Login</b-button>
        </center>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        uEmail: "",
        uPassword: "",
      },
      auth: false,
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      await axios
        .get("https://testapi.io/api/dartya/resource/users/1")
        .then((res) => {
          if (res && res.data) {
            if (
              this.form.uEmail === res.data.email &&
              this.form.uPassword === res.data.password
            ) {
              this.auth = true;
              this.$router.push("/");
            }
          }

          console.log(this.auth);
        });
    },
  },
};
</script>

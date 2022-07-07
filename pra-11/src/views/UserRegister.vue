<template>
  <div>
    <div class="container">
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
      </div>
    </div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="onSubmit">
        <center>
          <h1>Register Page</h1>
          <validation-provider
            rules="required|alpha_spaces"
            name="name"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="form.name"
              :error-messages="errors"
              label="name"
              required
              type="text"
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="email"
          >
            <v-text-field
              v-model="form.email"
              :error-messages="errors"
              label="email"
              required
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>

          <validation-provider required name="password" v-slot="{ errors }">
            <v-text-field
              v-model="form.password"
              :error-messages="errors"
              label="password"
              type="password"
              required
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            :rules="{
              required,
              regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
            }"
            name="cPassword"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="form.ucPassword"
              :error-messages="errors"
              label="confirm password"
              type="password"
              required
              class="shrink mx-7"
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="gender"
            rules="required"
          >
            <v-select
              v-model="form.selectedGender"
              :items="form.genderOptions"
              :error-messages="errors"
              label="Gender"
              class="shrink mx-7"
              data-vv-name="select"
              required
            ></v-select>
          </validation-provider>
          <validation-provider rules="required" name="role" v-slot="{ errors }">
            <v-select
              :items="form.roleoptions"
              label="role"
              :error-messages="errors"
              v-model="form.selectedrole"
              class="shrink mx-7"
            ></v-select>
          </validation-provider>
          <validation-provider
            rules="required|numeric"
            name="age"
            v-slot="{ errors }"
          >
            <v-text-field
              type="numeric"
              v-model="form.age"
              label="Enter age"
              :error-messages="errors"
              class="shrink mx-7"
            >
            </v-text-field>
          </validation-provider>
          <validation-provider rules="required" name="dob" v-slot="{ errors }">
            <v-row justify="center">
              <v-date-picker
                v-model="form.dob"
                :error-messages="errors"
              ></v-date-picker>
            </v-row>
          </validation-provider>

          <v-btn class="mr-4 mb-5" type="submit" :disabled="invalid">
            submit
          </v-btn>
          <v-btn @click="clear" class="mb-5"> clear </v-btn>
        </center>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import AlertBox from "../components/AlertBox.vue";
export default {
  components: { AlertBox },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        ucPassword: "",
        age: "",
        dob: "",
        selectedrole: "null",
        roleoptions: [
          { value: null, text: "Select Role" },
          { value: "Customer", text: "Customer" },
          { value: "employee", text: "Employee" },
          { value: "admin", text: "Admin" },
        ],
        selectedgender: "male",
        genderOptions: ["male", "female"],
      },
      isLoading: false,
      errmsg: "",
      successmsg: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      this.userRegister(this.form);
    },
    async userRegister(form) {
      let res = await this.$store.dispatch("auth/registerUser", form);
      if (res === "success") {
        this.$router.push({ name: "home" });
      } else {
        this.errmsg = "oops! somthing went wrong";
      }
    },
    clear() {
      (this.form.name = ""),
        (this.form.email = ""),
        (this.form.password = ""),
        (this.form.ucPassword = ""),
        (this.form.age = ""),
        (this.form.dob = ""),
        (this.form.selectedrole = ""),
        (this.form.selectedgender = "");
    },
  },
};
</script>

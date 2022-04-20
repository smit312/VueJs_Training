<template>
  <div class="container">
    <ValidationObserver ref="observer">
      <b-form @submit="onSubmit">
        <center>
          <AlertBox
            v-if="this.isLoading === false && this.errorMsg !== ''"
            showAlert="true"
            alertVariant="danger"
            :alertMessage="this.errorMsg"
          />
          <h1 class="mt-3">Register Page</h1>
          <ValidationProvider
            rules="required|alpha_spaces"
            name="name"
            v-slot="{ errors }"
          >
            <b-form-group label="name" class="mb-2">
              <b-form-input
                v-model="form.name"
                type="text"
                :state="errors[0] ? false : valid ? true : null"
                placeholder="Enter name"
                required
                class="w-50"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="required|email"
            name="email"
            v-slot="{ errors }"
          >
            <b-form-group label="email" class="mb-2">
              <b-form-input
                v-model="form.email"
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
            name="password"
            v-slot="{ errors }"
          >
            <b-form-group label="password" class="mb-2">
              <b-form-input
                v-model="form.password"
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
          <ValidationProvider
            :rules="{
              required,
              regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/,
            }"
            name="ucPassword"
            v-slot="{ errors }"
          >
            <b-form-group label="confirm password" class="mb-2">
              <b-form-input
                v-model="form.ucPassword"
                type="password"
                :state="errors[0] ? false : valid ? true : null"
                placeholder="Enter confirm password"
                required
                class="w-50"
              ></b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="required" name="role" v-slot="{ errors }">
            <b-form-group label="Role" class="mb-2">
              <b-form-select
                v-model="form.selectedrole"
                :options="form.roleoptions"
              ></b-form-select>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="required"
            name="gender"
            v-slot="{ errors }"
          >
            <b-form-group label="gender" class="mb-2">
              <b-form-radio-group
                v-model="form.selectedgender"
                :options="form.genderOptions"
                :aria-describedby="ariaDescribedby"
                inline="true"
              ></b-form-radio-group>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            rules="required|numeric"
            name="age"
            v-slot="{ errors }"
          >
            <b-form-group label="age" class="mb-2">
              <b-form-input
                type="text"
                v-model="form.age"
                :state="errors[0] ? false : valid ? true : null"
                placeholder="Enter age"
                class="w-50"
              >
              </b-form-input>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider rules="required" name="dob" v-slot="{ errors }">
            <b-form-group label="Choose Date Of Birth" class="mb-2 w-50">
              <b-form-datepicker
                v-model="form.dob"
                class="mb-2"
              ></b-form-datepicker>
              <b-form-invalid-feedback>
                {{ errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-button type="submit" variant="primary">Register</b-button>
        </center>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from "axios";
import AlertBox from "./AlertBox.vue";
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
        genderOptions: [
          { value: "male", text: "Male" },
          { value: "female", text: "Female" },
        ],
      },
      isLoading: false,
      errmsg: "",
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form));
      let uDetails = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        role: this.form.selectedrole,
        age: this.form.age,
        dob: this.form.dob,
        gender: this.form.selectedgender,
      };
      this.userRegister(uDetails);
      this.form = {
        name: "",
        email: "",
        password: "",
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
        genderOptions: [
          { value: "male", text: "Male" },
          { value: "female", text: "Female" },
        ],
      };
    },
    async userRegister(form) {
      this.isLoading = true;
      await axios
        .post("https://testapi.io/api/dartya/resource/users", form)
        .then(() => {
          this.isLoading = false;
          this.$router.push("/login");
        })
        .catch(() => {
          (this.isLoading = false),
            (this.errmsg = "oops! somthing went wrong!");
        });
    },
  },
};
</script>
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="this.AllUser"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>
 

<script>
export default {
  name: "UsersList",
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name",
        },
        { text: "Email", value: "email" },
        { text: "role", value: "role" },
        { text: "age", value: "age" },
        { text: "DOB", value: "dob" },
        { text: "gender", value: "gender" },
      ],
    };
  },
  computed: {
    AllUser() {
      return this.$store.getters["auth/getAllUser"];
    },
  },
};
</script>
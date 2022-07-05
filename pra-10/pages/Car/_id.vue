<template>
  <h1>You are current in : {{ $route.params.id }}</h1>
</template>

<script>
export default {
  validate(data) {
    // console.log("data", data);
    // return data.params.id == 1;
    return /^\d+$/.test(data.params.id); // cheking the number if it's not a number than error page display
  },
};
</script>
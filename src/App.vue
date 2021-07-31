<template>
  <h1 class="title">{{ message }}</h1>
</template>

<script>
import { print } from "@/assets/js/print";

export default {
  name: "App",
  data() {
    return {
      message: "Hello world!"
    }
  },
  mounted() {
    print("Hello world!");
  }
}
</script>

<style scoped>
@import "@/assets/css/reset.css";
.title {
  font-size: 18px
}
</style>

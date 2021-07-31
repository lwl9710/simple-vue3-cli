<template>
  <h1 class="title">{{ message }}</h1>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "Hello world!"
    }
  }
}
</script>

<style scoped>
.title {
  font-size: 18px
}
</style>

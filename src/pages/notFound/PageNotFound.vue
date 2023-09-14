<template>
  <h1>Page Not Found!</h1>
  <v-btn to="/dashboard" color="blue" outline elevation="6"> Back to home</v-btn>
</template>
  
<script>
export default {
  name: "PageNotFound",
  data: () => ({}),
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style src="./PageNotFound.scss" lang="scss" scoped />
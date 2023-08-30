<template>
  <h1>Page Not Found!</h1>
  <img src="../../assets/img/404.jpg" />
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
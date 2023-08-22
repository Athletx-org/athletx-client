<template>
  <h1>Page Not Found!</h1>
  <img src="../../assets/404.jpg" />
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
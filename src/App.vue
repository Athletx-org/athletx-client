<template>
  <NavBar/>
  <router-view></router-view>

</template>

<script>
import NavBar from "./components/navbar/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
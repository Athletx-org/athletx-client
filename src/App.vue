<template>
  <v-app>
    <NavBar />
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
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
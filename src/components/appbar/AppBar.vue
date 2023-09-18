<template>
    <v-app-bar app color="light">
      <v-toolbar-title>
        <router-link class="appbar-title" to="/home">
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer/>

      <v-btn to="/login" class="bg-blue-darken-1 mx-5">
        <strong>GET STARTED</strong>
      </v-btn>
    </v-app-bar>
</template>


<script>
export default {
  name: "AppBar",
  props: {
    title: String,
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
};
</script>

<style src="./AppBar.scss"  lang="scss" scoped />
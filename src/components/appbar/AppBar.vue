<template>
    <v-app-bar app color="light">
      <router-link to="/home">
        <img
            alt="logo"
            class="mx-2"
            :src="require('@/assets/img/logo.png')"
        />
      </router-link>

      <v-toolbar-title>
        <router-link to="/home">
          {{ title }}
        </router-link>
      </v-toolbar-title>
      <v-spacer/>

      <v-btn to="/login">
        GET STARTED
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
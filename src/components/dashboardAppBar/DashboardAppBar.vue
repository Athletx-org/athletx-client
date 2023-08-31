<template>
  <v-app-bar app color="light">
    <v-btn
        elevation="4"
        @click="toggleDrawerVisibility"
    >
      <v-icon icon="mdi-menu" size="large"/>
      <v-spacer></v-spacer>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="black" @click.prevent="logout" class="mr-5">
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DashboardAppBar",
  methods: {
    ...mapActions('drawer', ['toggleDrawerVisibility']),
    logout() {
      this.$store.dispatch("auth/logout")
      this.$router.push("/home")
    }
  }
}
</script>

<style src="./DashboardAppBar.scss" lang="scss" scoped/>
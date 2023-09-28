<template>
  <v-app-bar app color="light">
    <v-btn
        elevation="4"
        @click="toggleDrawerVisibility"
    >
      <v-icon icon="mdi-menu" size="large"/>
    </v-btn>
    <v-toolbar-title class="text-center">
    <v-img :src="require('@/assets/img/athletx_banner.png')" width="150"/>
    </v-toolbar-title>
    <v-spacer/>
    <v-btn size="large">
      <v-icon icon="mdi-bell-ring" size="large"/>
    </v-btn>
    <v-btn id="menu-activator" size="x-large">
      <v-icon icon="mdi-account" size="x-large"/>
    </v-btn>
    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item to="/">
          <v-icon>mdi-home</v-icon>
          Home
        </v-list-item>
        <v-list-item to="/profile">
          <v-icon>mdi-account</v-icon>
          Profile
        </v-list-item>
        <v-divider/>
        <v-list-item>
          <v-btn prepend-icon="mdi-logout" color="paletteBlue" variant="outlined" >
            Logout
          </v-btn>
          <v-dialog v-model="logoutDialog" activator="parent" transition="dialog-top-transition" width="auto">
            <v-card>
              <v-card-text class="text-center">Are you sure you want to <strong>Logout</strong> ?</v-card-text>
              <v-card-actions>
                <v-row class="text-center" align-content="center" justify="space-around">
                  <v-col cols="12" class="text-center">
                    <v-btn color="blue-darken-1" variant="elevated" elevation="6" @click="logout">Yes</v-btn>
                    <v-btn color="red" variant="elevated" elevation="6" @click="this.logoutDialog = false">No</v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "DashboardAppBar",
  data() {
    return {
      logoutDialog: false
    }
  },
  methods: {
    ...mapActions('drawer', ['toggleDrawerVisibility']),
    logout() {
      this.logoutDialog = false
      this.$store.dispatch("auth/logout")
      this.$router.push("/home")
    }
  }
}
</script>

<style src="./DashboardAppBar.scss" lang="scss" scoped/>
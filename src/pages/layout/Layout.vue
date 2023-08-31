<template>
    <DashboardAppBar />
    <NavigationDrawer />
    <v-main>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
</template>

<script>
import userService from '@/services/user.service';
import NavigationDrawer from "@/components/navigationDrawer/NavigationDrawer";
import DashboardAppBar from "@/components/dashboardAppBar/DashboardAppBar.vue";

export default {
  name: "Layout",
  components: {
    NavigationDrawer,
    DashboardAppBar,
  },
  data() {
    return {
      data: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      userService.getUserInfo()
          .then((response) => {
            console.log(response)
            this.data = "profile";
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
    },
  }
};
</script>

<style src="./Layout.scss" lang="scss" scoped/>
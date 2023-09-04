<template>
  <DashboardAppBar />
  <v-main>
    <NavigationDrawer :width="isMobile ? width : auto" />
    <v-container fluid v-show="!(isMobile && isDrawerVisible)">
      <router-view />
    </v-container>
  </v-main>
</template>

<script>
import NavigationDrawer from "@/components/navigationDrawer/NavigationDrawer";
import DashboardAppBar from "@/components/dashboardAppBar/DashboardAppBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Layout",
  components: {
    NavigationDrawer,
    DashboardAppBar,
  },
  data() {
    return {
      data: "",
      isMobile: false,
      width: ""
    };
  },
  created() {
    this.fetchData();
    this.setIsMobile(this.$vuetify.display.smAndDown);
  },
  methods: {
    fetchData() {
      // userService.getUserInfo()
      //     .then((response) => {
      //       console.log(response)
      //       this.data = "profile";
      //     })
      //     .catch(error => {
      //       console.error('Errore durante la richiesta:', error);
      //     });
      this.data = "profile"
    },
    setIsMobile(state) {
      this.isMobile = state
      this.width = this.$vuetify.display.width
    },
    handleResize() {
      this.setIsMobile(this.$vuetify.display.smAndDown);
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  computed: {
    ...mapGetters('drawer', ['isDrawerVisible'])
  },
};
</script>

<style src="./Layout.scss" lang="scss" scoped/>
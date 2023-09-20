<template>
        <v-navigation-drawer
            app
            v-model="isDrawerVisible"
            permanent
            color="blue-darken-1"
        >
          <v-list density="compact" nav>
            <v-list-item
                v-for="item in drawerItems"
                :key="item.title"
                :value="item.value"
                :to="item.link"
                class="drawerItem"
                active-class="drawerItem-active"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon" class="drawerIcon" size="small"></v-icon>
              </template>
              <v-list-item-content>
                <v-list-item-title> {{item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
export default {
  name: "NavigationDrawer",
  data() {
    return {
      rail: false,
      drawerItems: [
        {
          icon: "mdi-view-dashboard",
          title:"Dashboard",
          value:"dashboard",
          link:"/dashboard"
        },
        {
          icon: "mdi-folder",
          title:"Workouts",
          value:"workouts",
          link:"/workouts"
        },
        {
          icon: "mdi-account",
          title:"Profile",
          value:"profile",
          link:"/profile"
        },
        {
          icon: "mdi-trending-up",
          title:"Analytics",
          value:"analytics",
          link:"/analytics"
        },
        {
          icon: "mdi-check-circle-outline",
          title:"Goals",
          value:"goals",
          link:"/goals"
        },

      ]
    };
  },
  created() {
    this.setVisibility(this.$vuetify.display.smAndDown);
  },
  methods: {
    handleResize() {
      this.setVisibility(this.$vuetify.display.smAndDown);
    },
    logout() {
      this.$store.dispatch("auth/logout")
      this.$router.push("/home")
    },
    ...mapMutations("drawer", ["setDrawerVisibility"]),
    setVisibility(state){
      this.setDrawerVisibility(!state); 
    }
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
}
</script>
<style src="./NavigationDrawer.scss" lang="scss" scoped />
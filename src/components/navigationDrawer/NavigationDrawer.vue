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
        <v-list-item>
          <v-list-item-title> {{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-row class="text-center">
        <v-col cols="12">
          <v-btn
              prepend-icon="mdi-logout"
              color="black"
              class="bg-white my-5"
              variant="tonal"
              elevation="6">
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
        </v-col>
      </v-row>
    </template>
  </v-navigation-drawer>
</template>
<script>
import {mapGetters} from 'vuex';
import {mapMutations} from 'vuex';

export default {
  name: "NavigationDrawer",
  data() {
    return {
      rail: false,
      logoutDialog: false,
      drawerItems: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          value: "dashboard",
          link: "/dashboard"
        },
        {
          icon: "mdi-folder",
          title: "Workouts",
          value: "workouts",
          link: "/workouts"
        },
        {
          icon: "mdi-account",
          title: "Profile",
          value: "profile",
          link: "/profile"
        },
        {
          icon: "mdi-trending-up",
          title: "Analytics",
          value: "analytics",
          link: "/analytics"
        },
        {
          icon: "mdi-check-circle-outline",
          title: "Goals",
          value: "goals",
          link: "/goals"
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
      this.logoutDialog = false
      this.$store.dispatch("auth/logout")
      this.$router.push("/home")
    },
    ...mapMutations("drawer", ["setDrawerVisibility"]),
    setVisibility(state) {
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
<style src="./NavigationDrawer.scss" lang="scss" scoped/>
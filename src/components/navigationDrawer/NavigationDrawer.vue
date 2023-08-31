<template>
    <v-card>
        <v-navigation-drawer
            app
            v-model="isDrawerVisible"
        >
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Workouts" value="workouts" to="/"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Profile" value="profile" to="/profile"></v-list-item>
            <v-list-item prepend-icon="mdi-forum" title="Analytics" value="analytics" to="/"></v-list-item>
          </v-list>
        </v-navigation-drawer>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "NavigationDrawer",
  computed: {
    ...mapGetters('drawer', ['isDrawerVisible'])
  },
}
</script>
<style src="./NavigationDrawer.scss" lang="scss" scoped />
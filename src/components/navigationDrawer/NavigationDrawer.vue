<template>
        <v-navigation-drawer
            app
            v-model="isDrawerVisible"
            permanent
            class="bg-cyan-darken-4"

        >
          <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
              title="Admin Admin"
          >
          </v-list-item>
          <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard" to="/dashboard"></v-list-item>
            <v-list-item prepend-icon="mdi-folder" title="Workouts" value="workouts" to="/workouts"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="Profile" value="profile" to="/profile"></v-list-item>
            <v-list-item prepend-icon="mdi-trending-up" title="Analytics" value="analytics" to="/analytics"></v-list-item>
            <v-list-item prepend-icon="mdi-trending-up" title="Goal" value="goals" to="/goals"></v-list-item>
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
    };
  },
  created() {
    this.setVisibility(this.$vuetify.display.smAndDown);
  },
  methods: {
    handleResize() {
      this.setVisibility(this.$vuetify.display.smAndDown);
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
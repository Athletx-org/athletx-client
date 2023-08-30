<template>
  <v-app light>
    <AppBar title=""/>
    <v-main class="pt-0">
        <router-view></router-view>
    </v-main>
  </v-app>

</template>
<script>

import AppBar from "@/components/appbar/AppBar";

export default {
  name: "App",
  components: {
    AppBar,
  }
};
</script>

<style src="./style/App.scss" lang="scss" />
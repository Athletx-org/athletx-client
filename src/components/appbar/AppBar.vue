<template>
  <v-row>
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
        <span>Login</span>
      </v-btn>
      <v-btn to="/signup" class="mr-5">
        <span>Signup</span>
      </v-btn>
    </v-app-bar>
  </v-row>
</template>


<script>
export default {
  name: "AppBar",
  props: {
    title: String,
  },
};
</script>


<style scoped>

img {
  margin-top: 10pt;
  max-width: 45px;
}

.v-btn {
  background-color: #C7EEFF;
  margin: 3px;
}

</style>
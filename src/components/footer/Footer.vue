<template>
  <v-footer>
    <v-card class="text-center">
      <v-divider></v-divider>
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>AthletX</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style src="./Footer.scss" lang="scss" scoped/>

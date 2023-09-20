<template>
  <v-footer>
    <v-container>
      <v-row no-gutters align-content="center">
        <v-col cols="12">
        <v-card class="text-center" variant="tonal">
          <v-divider></v-divider>
          <v-card-text>
            {{ new Date().getFullYear() }} — <strong>AthletX</strong>
          </v-card-text>
        </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style src="./Footer.scss" lang="scss" scoped/>

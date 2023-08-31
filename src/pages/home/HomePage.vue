<template>
  <AppBar />
  <v-main>
      <v-container fluid>
        <v-row>
          <!-- Title Column -->
          <v-col cols="12" md="6">
            <div class="title-container">
              <h1 class="title">
                {{title}}<span class="last-char">X</span>
              </h1>
              <h2 class="subtitle">
                UNLEASH <br> YOUR <br> POTENTIAL
              </h2>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="image-container">
              <img :src="require('@/assets/img/home_background.jpg')" alt="Homepage Image" class="image">
            </div>
          </v-col>
        </v-row>
      </v-container>
  </v-main>
</template>

<script>
import AppBar from "@/components/appbar/AppBar";

export default {
  name: "HomePage",
  components: {
    AppBar,
  },
  data() {
    return {
      serverMsg: [],
      imageSrc: '@/assets/img/home_background.jpg',
      title: "Athlet"
    }
  }
}
</script>

<style src="./HomePage.scss" lang="scss" scoped />
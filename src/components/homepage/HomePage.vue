<template>
  <AppBar title=""/>
    <v-main class="pt-0">
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
import AppBar from "../../components/appbar/AppBar.vue";

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

<style scoped>
.title-container {
  margin-top: 100pt;
  display: compact;
   align-items: center;
   justify-content: center;
   height: 100%;
 }

.title {
  font-size: 60px;
  font-style: italic;
  text-align: center;
}

.last-char {
  color: #1298d2
}

.subtitle {
  font-size: 30px;
  font-style: italic;
  text-align: center;
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.image {
  max-width: 50%;
  height: auto;
}

</style>

<template>
  <AppBar title="X"/>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col md="1"/>
        <v-col cols="12" md="5" class="text-center">
          <div class="title-container text-center">
            <h1 class="title">
              {{ title }}<span class="last-char">X</span>
            </h1>
            <h3 class="subtitle">
              Design, Manage, Achieve. <br>
            </h3>
            <v-btn class="mt-5"
                   elevation="6"
                   variant="outlined"
                   color="blue"
                   rounded
                   to="/login"
            > Start now your fitness journey
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="5" class="text-center">
          <div class="image-container mt-10">
            <v-scroll-x-transition>
              <img src="@/assets/img/home_backgrounds/standing_man_weights.jpg" class="background-image" alt="athletx home page image">
            </v-scroll-x-transition>
          </div>
        </v-col>
        <v-col md="1"/>
      </v-row>
      <v-row align="center" justify="center" class="mt-12">
        <v-col cols="10">
          <v-row align="center" justify="space-around">
            <v-col cols="12" sm="4" class="text-center" v-for="(feature, i) in features" :key="i">
              <v-hover v-slot:default="{ isHovering, props }">
                <v-card
                    v-bind="props"
                    :variant="isHovering ? 'plain' : 'outlined'"
                    :elevation="isHovering ? 10: 4"
                    :class="isHovering ? 'up' : undefined">
                  <v-img
                      :src="feature.img"
                      max-width="80px"
                      class="d-block ml-auto mr-auto mt-5"
                  ></v-img>
                  <v-card-title><h4>{{ feature.title }}</h4></v-card-title>
                  <v-card-text>
                    {{ feature.text }}
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <MyFooter />
</template>

<script>
import AppBar from "@/components/appbar/AppBar";
import MyFooter from "@/components/footer/Footer";

export default {
  name: "HomePage",
  components: {
    AppBar,
    MyFooter,
  },
  data() {
    return {
      serverMsg: [],
      imageSrc: '@/assets/img/home_background.jpg',
      title: "Athlet",
      features: [
        {
          img: require("@/assets/img/home_icons/add.png"),
          title: "Create your workouts",
          text: "Create your workout choosing from a set of well known exercises. ",
        },
        {
          img: require("@/assets/img/home_icons/target.png"),
          title: "Setup your gym goals",
          text: "Challenge yourself by setting some goals to achieve and mark them as completed.",
        },
        {
          img: require("@/assets/img/home_icons/analysis.png"),
          title: "Analyze your performance",
          text: "Analyze some statistics about your workouts to create increasingly effective workouts.",
        },
      ],
    }
  }
}
</script>

<style src="./HomePage.scss" lang="scss" scoped/>
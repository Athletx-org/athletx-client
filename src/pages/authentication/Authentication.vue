<template>
  <AppBar title="X"/>
  <v-main>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">
          <div class="title-container text-center">
            <h1 class="title">
              Athlet<span class="last-char">X</span>
            </h1>
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6 mt-5">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <Login/>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="bg-blue rounded-bl-xl">
                    <div class="signup-section">
                      <v-card-text class="text-white">
                        <h2 class="text-center">Don't Have an Account Yet?</h2>
                        <h4 class="text-center mt-2">
                          Let's start now to create your first workouts!
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn class="text-black mt-2" elevation="6" @click="step++">SIGN UP</v-btn>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="6" class="bg-blue rounded-br-xl">
                    <div class="login-section">
                      <v-card-text class="text-white">
                        <h2 class="text-center ">Alredy Signed up?</h2>
                        <h4 class="text-center mt-2">
                          Log in to your account so you can continue creating your workouts
                        </h4>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn class="text-black" elevation="6" @click="step--">Login</v-btn>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-5">
                      <Signup/>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <MyFooter />
</template>

<script>
import AppBar from "@/components/appbar/AppBar";
import Login from "@/components/login/Login";
import Signup from "@/components/signup/Signup";
import MyFooter from "@/components/footer/Footer"

export default {
  components: {
    AppBar,
    Login,
    Signup,
    MyFooter
  },
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }


}
</script>
<style src="./Authentication.scss" lang="scss" scoped/>

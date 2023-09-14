<template>
<AppBar />
  <v-main>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <Login />
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="bg-blue rounded-bl-xl">
                  <div style="  text-align: center; padding-bottom: 250px; padding-top: 100px">
                    <v-card-text class="text-white" >
                      <h3 class="text-center">Don't Have an Account Yet?</h3>
                      <h4 class="text-center" >
                        Let's start now to create your first workouts
                      </h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">SIGN UP</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6" class="bg-blue rounded-br-xl">
                  <div style="  text-align: center; padding-bottom: 250px; padding-top: 100px">
                    <v-card-text class="text-white">
                      <h3 class="text-center ">Alredy Signed up?</h3>
                      <h4 class="text-center mt-2">
                        Log in to your account so you can continue creating your workouts
                      </h4>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">Log in</v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <Signup />
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
</template>

<script>
import AppBar from "@/components/appbar/AppBar";
import Login from "@/components/login/Login";
import Signup from "@/components/signup/Signup";

export default {
  components: {
    AppBar,
    Login,
    Signup,
  },
  data: () => ({
    step: 1
  }),
  props: {
    source: String
  }


}
</script>
<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 150px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 150px !important;
}
</style>

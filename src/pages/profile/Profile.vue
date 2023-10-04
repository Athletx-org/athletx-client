<template>
  <v-row class="mt-2">
    <v-col md="1" />
    <v-col cols="12" md="5" class="text-center">
      <v-card variant="outlined" elevation="10">
        <v-card-title><h2><i>Profile</i></h2></v-card-title>
        <v-form>
          <v-container>
            <v-row justify="center">
              <v-col cols="12" md="5">
                <v-img :src="profilePicPath" alt="" height="150"/>
              </v-col>
              <v-col cols="12" md="5" class="mt-8">
                <v-file-input
                    label="Change profile picture"
                    accept="image/*"
                    v-model="files"
                    variant="outlined"
                    @change="handlePictureChange"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/user.png')"
                      />
                    </v-icon>
                  </template>
                </v-file-input>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="5">
                <v-text-field
                    label="Name"
                    v-model="user.name"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/name.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                    label="Surname"
                    v-model="user.surname"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/name.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="5">
                <v-text-field
                    label="City"
                    v-model="user.city"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/city.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field
                    label="Country"
                    v-model="user.country"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/country.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="5" class="mr-2">
                <v-text-field
                    color="blue-darken-1"
                    variant="outlined"
                    type="number"
                    :min="0"
                    :max="100"
                    label="Age"
                    v-model="user.age"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/age.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-text-field type="number" :min="0" :max="250" color="blue-darken-1" variant="outlined" label="Height (Cm)" v-model="user.height">
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/height.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="10">
                <v-textarea variant="outlined" color="blue-darken-1" clearable label="About Me" v-model="user.bio">
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/bio.png')"
                      />
                    </v-icon>
                  </template>
                </v-textarea>
              </v-col>
            </v-row>
            <v-row class="text-center my-3" no-gutters justify="center">
              <v-btn
                  size="small"
                  color="blue-darken-1"
                  variant="elevated"
                  elevation="6"
                  class="mr-1"
                  @click="updateProfile"
              >
                Save
              </v-btn>
              <v-btn
                  size="small"
                  color="red"
                  variant="elevated"
                  elevation="6"
                  @click="cancelEditing"
                  to="/profile"
              >
                CANCEL
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
    <v-col md="1" />
    <v-col cols="12" md="4">
      <v-card variant="outlined" elevation="10" max-height="700">
        <v-card-title class="text-center">
          <h2><i>Improvements</i></h2>
        </v-card-title>
        <v-img
            :src="require('@/assets/img/icons/improvement.png')"
            max-width="120px"
            class="d-block ml-auto mr-auto mt-2"
        />
        <v-card-text>
          <v-form>
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="8">
                <v-text-field
                    readonly
                    variant="outlined"
                > {{  new Date().toLocaleDateString()}}
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/calendar.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="8">
              <v-text-field
                    type="number"
                    label="Body Weight (Kg)"
                    :min="0"
                    :max="250"
                    variant="outlined"
                    v-model="improvement.bodyWeight"
                >
                <template v-slot:prepend-inner>
                <v-icon size="large">
                  <v-img
                      :src="require('@/assets/img/icons/weight.png')"
                  />
                </v-icon>
                </template>
              </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" no-gutters>
              <v-col cols="12" md="8">
                <v-text-field
                    type="number"
                    label="Body Fat (%)"
                    variant="outlined"
                    :max="100"
                    :min="0"
                    v-model="improvement.bodyFat"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/body-fat.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row  justify="center" no-gutters>
              <v-col cols="12" md="4">
                <v-text-field
                    type="number"
                    label="Biceps (cm)"
                    variant="outlined"
                    v-model="improvement.biceps"
                    :min="0"
                    :max="50"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/biceps.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    type="number"
                    label="Chest (cm)"
                    variant="outlined"
                    v-model="improvement.chest"
                    :min="0"
                    :max="100"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/chest.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    type="number"
                    label="Quadriceps (cm)"
                    variant="outlined"
                    v-model="improvement.quadriceps"
                    :min="0"
                    :max="100"
                >
                  <template v-slot:prepend-inner>
                    <v-icon size="large">
                      <v-img
                          :src="require('@/assets/img/icons/quadriceps.png')"
                      />
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row class="text-center mb-2" justify="center">
              <v-btn
                  variant="elevated"
                  size="small"
                  color="paletteBlue"
                  elevation="6"
                  v-on:click.prevent
                  @click="addNewImprovement"
              > Save
              </v-btn>
              <v-btn
                  variant="flat"
                  size="small"
                  class="ml-1"
                  color="red"
                  elevation="6"
                  v-on:click.prevent
                  @click="cancelEditing"> Cancel
              </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      userId: this.$store.state.auth.user._id,
      editing: true,
      error: null,
      user: {
        name: '',
        surname: '',
        city: '',
        country: '',
        age: '',
        height: '',
        bio: '',
        profilePic: '',
      },
      files: null,
      inputProfilePic: null,
      profilePicPath: null,
      improvement: {
        timeStamp: null,
        bodyWeight: null,
        bodyFat: null,
        biceps: null,
        chest: null,
        quadriceps: null
      },
    };
  },
  created() {
    this.fetchUserInfo()
    this.fetchUserImprovement()
  },
  methods: {
    async fetchUserInfo() {
      await UserService.getUserInfo(this.userId).then(
          res => {
            if (res != null) {
              this.user = res
              this.profilePicPath = process.env.VUE_APP_BASE_URL + this.user.profilePic
            }
          }
      )
    },
    async fetchUserImprovement() {
      await UserService.getUserImprovement(this.userId).then(
          res => {
            if(res != null) {
              this.improvement = res
            }
          }
      )
    },
    async updateProfile() {
      if (this.inputProfilePic !== null) {
        this.user.profilePic = this.inputProfilePic
      }
      await UserService.updateUserInfo(this.userId, this.user)
      await this.fetchUserInfo()
    },
    async cancelEditing() {
      await this.fetchUserInfo()
      window.location.reload()
    },
    handlePictureChange() {
      if (this.files !== null) {
        this.inputProfilePic = this.files[0]
        this.profilePicPath = URL.createObjectURL(this.inputProfilePic)
      }
    },
    async addNewImprovement() {
      this.improvement.timeStamp = Date.now()
       await UserService.addImprovement(this.userId, this.improvement)
    },
  }
};
</script>

<style src="./Profile.scss" lang="scss" scoped/>
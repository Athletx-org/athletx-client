<template>
  <v-row class="mt-5">
    <v-col cols="12" md="6" class="text-center">
      <v-card v-if="editing" variant="flat" elevation="10">
        <v-card-title class="text-left"><h3><i>Personal Information</i></h3></v-card-title>
        <v-form>
          <v-container>
            <v-row justify="start" no-gutters>
              <v-col cols="12" md="4">
                <v-img :src="profilePicPath" alt="" height="150"/>
              </v-col>
              <v-col cols="12" md="6" class="mt-8">
                <v-file-input
                    label="New profile picture"
                    accept="image/*"
                    v-model="files"
                    variant="outlined"
                    @change="handlePictureChange"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                    label="Name"
                    v-model="user.name"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    label="Surname"
                    v-model="user.surname"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                />
              </v-col>
            </v-row>
            <v-row no-gutters="">
              <v-col cols="12" md="4" class="mr-2">
                <v-text-field
                    label="City"
                    v-model="user.city"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                    label="Country"
                    v-model="user.country"
                    clearable
                    variant="outlined"
                    color="blue-darken-1"
                />
              </v-col>
              <v-col cols="12" md="4"></v-col>
            </v-row>
            <v-row no-gutters="">
              <v-col cols="12" md="4" class="mr-2">
                <v-text-field color="blue-darken-1" variant="outlined" type="number" label="Weight (Kg)" v-model="user.weight"/>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field color="blue-darken-1" variant="outlined" clearable label="Height (Cm)" v-model="user.height"/>
              </v-col>
              <v-col cols="12" md="4"></v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="10">
                <v-textarea variant="outlined" color="blue-darken-1" clearable label="About Me" v-model="user.bio"/>
              </v-col>
            </v-row>
            <v-row class="text-center" no-gutters justify="center">
              <v-btn
                  color="blue-darken-1"
                  variant="elevated"
                  elevation="6"
                  class="my-5"
                  @click="updateProfile"
              >
                <strong>Update</strong>
              </v-btn>
              <v-btn
                  color="red"
                  variant="elevated"
                  elevation="6"
                  class="my-5 mr-1"
                  @click="cancelEditing"
                  to="/profile"
              >
                <strong>CANCEL</strong>
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card variant="flat" elevation="10" max-height="700">
        <v-card-title class="text-left">
          <h3><i>My improvements</i></h3>
        </v-card-title>
        <v-card-text class="scroll">
          <v-row class="text-center" justify="center">
            <v-timeline density="default" align="start" side="end" class="scroll">
              <v-timeline-item
                  fill-dot
                  :dot-color="displayAddNewImprovement ? 'red' : 'yellow'"
                  size="small"
                  :icon="displayAddNewImprovement ? 'mdi-minus' : 'mdi-plus'"
              >
                <v-btn v-if="!displayAddNewImprovement" @click="displayAddNewImprovement = true"> Add new</v-btn>
                <v-card v-if="this.displayAddNewImprovement" variant="plain">
                  <v-card-text>
                    <v-date-picker
                        hide-actions
                        hide-weekdays
                        input-mode="keyboard"
                        variant="outlined"
                        v-model="newImprovement.date"
                    />
                    <v-text-field
                        type="number"
                        variant="outlined"
                        label="Kg"
                        class="pt-2"
                        v-model="newImprovement.weight"
                    />
                    <v-btn
                        variant="elevated"
                        size="small"
                        color="paletteBlue"
                        elevation="6"
                        v-on:click.prevent
                        @click="addNewImprovement"
                    > Add
                    </v-btn>
                    <v-btn
                        variant="flat"
                        size="small"
                        class="ml-1"
                        color="red"
                        elevation="6"
                        v-on:click.prevent
                        @click="this.displayAddNewImprovement=false"> Cancel
                    </v-btn>

                  </v-card-text>
                </v-card>

              </v-timeline-item>
              <v-timeline-item
                  v-for="(improvement,i) in improvements"
                  :key="i"
                  size="small"
                  dot-color="paletteBlue"
                  fill-dot
              >
                <template v-slot:opposite>
                  <h4>
                    {{ improvement.date.toLocaleDateString() }}
                  </h4>
                </template>
                <h4> {{ improvement.weight }} Kg </h4>
              </v-timeline-item>
            </v-timeline>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/user.service";
import {VDatePicker} from 'vuetify/labs/VDatePicker'

export default {
  components: {
    VDatePicker,
  },
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
        weight: '',
        height: '',
        bio: '',
        profilePic: '',
      },
      improvements: [
        {
          date: new Date(),
          weight: '100'
        },
        {
          date: new Date(),
          weight: '100'
        },
        {
          date: new Date(),
          weight: '100'
        },
        {
          date: new Date(),
          weight: '100'
        },        {
          date: new Date(),
          weight: '100'
        },        {
          date: new Date(),
          weight: '100'
        },        {
          date: new Date(),
          weight: '100'
        },
        {
          date: new Date(),
          weight: '100'
        },
        {
          date: new Date(),
          weight: '100'
        },

      ],
      newImprovement: {
        date: new Date(),
        weight: ""
      },
      displayAddNewImprovement: false,
      files: null,
      inputProfilePic: null,
      profilePicPath: null,
    };
  },
  created() {
    this.fetchUserInfo()
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
    addNewImprovement() {
      this.improvements.push(structuredClone(this.newImprovement))
      this.displayAddNewImprovement = false
    },
  }
};
</script>

<style src="./Profile.scss" lang="scss" scoped/>
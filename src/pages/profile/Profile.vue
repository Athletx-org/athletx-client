<!--&lt;!&ndash; ProfileCard.vue &ndash;&gt;-->
<!--<template>-->
<!--  <v-card>-->
<!--    <v-card-text>-->
<!--      <v-row>-->
<!--        <v-col cols="12" sm="6">-->
<!--          <v-avatar size="150">-->
<!--            <img :src="profilePicPath" alt="Profile" />-->
<!--          </v-avatar>-->
<!--          <v-file-input-->
<!--              v-if="editing"-->
<!--              label="Profile Picture"-->
<!--              accept="image/*"-->
<!--              @change="handlePictureChange"-->
<!--          ></v-file-input>-->
<!--        </v-col>-->
<!--        <v-col cols="12" sm="6">-->
<!--          <div v-if="editing">-->
<!--            <v-text-field v-model="user.name" label="Name"></v-text-field>-->
<!--            <v-text-field v-model="user.surname" label="Surname"></v-text-field>-->
<!--            <v-text-field v-model="user.weight" label="Weight"></v-text-field>-->
<!--            <v-text-field v-model="user.height" label="Height"></v-text-field>-->
<!--            <div>-->
<!--              <v-btn-toggle v-model="user.gender" rounded class="rounded-pill mb-4">-->
<!--                <v-btn :value="male" rounded class="flat" color="blue">Male</v-btn>-->
<!--                <v-btn :value="female" class="flat" :color="'pink'">Female</v-btn>-->
<!--              </v-btn-toggle>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            &lt;!&ndash; Display-only fields &ndash;&gt;-->
<!--            <div><strong>Name:</strong> {{ user.name }}</div>-->
<!--            <div><strong>Surname:</strong> {{ user.surname }}</div>-->
<!--            <div><strong>Weight:</strong> {{ user.weight }}</div>-->
<!--            <div><strong>Height:</strong> {{ user.height }}</div>-->
<!--          </div>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-card-text>-->
<!--    <v-card-actions>-->
<!--      <v-btn v-if="!editing" @click="toggleEdit" class="bg-paletteBlue"> Edit Profile </v-btn>-->
<!--      <v-btn v-if="editing" @click="updateProfile"> Save </v-btn>-->
<!--    </v-card-actions>-->
<!--  </v-card>-->
<!--</template>-->

<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card v-if="!this.editing">
        <v-card-title> {{user.name}}</v-card-title>
        <v-card-actions>
          <v-btn @click="this.editing=true">Edit</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="editing" variant="elevated" elevation="6">
        <v-form>
          <v-container>
            <v-row>
            <v-col cols="12" md="4">
              <v-avatar size="100">
                <img :src="profilePicPath" alt=""/>
              </v-avatar>
              </v-col>
              <v-col cols="12" md="8" class="mt-3">
              <v-file-input
                  label="Profile Picture"
                  accept="image/*"
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
      <v-text-field color="blue-darken-1" type="number" label="Weight (Kg)" v-model="user.weight"/>
    </v-col>
    <v-col cols="12" md="4">
      <v-text-field color="blue-darken-1" label="Height (Cm)" v-model="user.height"/>
    </v-col>
    <v-col cols="12" md="4"></v-col>
  </v-row>
  <v-row no-gutters>
    <v-col cols="12">
      <v-textarea variant="outlined" color="blue-darken-1" label="About Me" v-model="user.bio"/>
    </v-col>
  </v-row>
  <v-row class="text-center" no-gutters justify="center">
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
    <v-btn
        color="blue-darken-1"
        variant="elevated"
        elevation="6"
        class="my-5"
        @click="updateProfile"
    >
      <strong>Update</strong>
    </v-btn>
  </v-row>
  </v-container>
  </v-form>
  </v-card>
  </v-col>
  <v-col
      cols="12"
      md="4"
  >
  </v-col>
  </v-row>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      userId: this.$store.state.auth.user._id,
      editing: false,
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
      inputProfilePic: '',
      profilePicPath: ''
    };
  },
  created() {
    this.fetchUserInfo()
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
    },
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
      this.toggleEdit()
      this.user.profilePic = this.inputProfilePic
      await UserService.updateUserInfo(this.userId, this.user)
      await this.fetchUserInfo()
    },
    async cancelEditing() {
      await this.fetchUserInfo()
      this.editing = false
    },
    handlePictureChange(file) {
      this.inputProfilePic = file
    }
  }
};
</script>

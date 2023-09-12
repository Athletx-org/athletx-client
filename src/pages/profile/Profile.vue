<!-- ProfileCard.vue -->
<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-avatar size="150">
            <img :src="profilePicPath" alt="Profile" />
          </v-avatar>
          <v-file-input
              v-if="editing"
              label="Profile Picture"
              accept="image/*"
              @change="handlePictureChange"
          ></v-file-input>
        </v-col>
        <v-col cols="12" sm="6">
          <div v-if="editing">
            <v-text-field v-model="user.name" label="Name"></v-text-field>
            <v-text-field v-model="user.surname" label="Surname"></v-text-field>
            <v-text-field v-model="user.weight" label="Weight"></v-text-field>
            <v-text-field v-model="user.height" label="Height"></v-text-field>
            <div>
              <v-btn-toggle v-model="user.gender" rounded class="rounded-pill mb-4">
                <v-btn :value="male" rounded class="flat" color="blue">Male</v-btn>
                <v-btn :value="female" class="flat" :color="'pink'">Female</v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <div v-else>
            <!-- Display-only fields -->
            <div><strong>Name:</strong> {{ user.name }}</div>
            <div><strong>Surname:</strong> {{ user.surname }}</div>
            <div><strong>Weight:</strong> {{ user.weight }}</div>
            <div><strong>Height:</strong> {{ user.height }}</div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="!editing" @click="toggleEdit"> Edit Profile </v-btn>
      <v-btn v-if="editing" @click="updateProfile"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  data() {
    return {
      userId: this.$store.state.auth.user._id,
      editing: false,
      user: {
        name: '',
        surname: '',
        weight: '',
        height: '',
        gender: '',
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
    handlePictureChange(event) {
      this.inputProfilePic = event.target.files[0];
    }
  },
};
</script>

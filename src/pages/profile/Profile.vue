<!-- ProfileCard.vue -->
<template>
  <v-card>
    <v-card-title class="headline">
      {{ editing ? 'Edit Profile' : 'Profile Information' }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6">
          <v-avatar size="150">
            <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="Profile" />
          </v-avatar>
        </v-col>
        <v-col cols="12" sm="6">
          <div v-if="editing">
            <v-text-field v-model="user.name" label="Name"></v-text-field>
            <v-text-field v-model="user.surname" label="Surname"></v-text-field>
            <v-text-field v-model="user.weight" label="Weight"></v-text-field>
            <v-text-field v-model="user.height" label="Height"></v-text-field>
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
      user: {}
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
      this.user = await UserService.getUserInfo(this.userId)
      console.log(this.user.name)
    },
    updateProfile() {
      console.log(this.user)
      this.toggleEdit()
    }
  },
};
</script>

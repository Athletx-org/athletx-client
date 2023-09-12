<template>
  <v-main>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" xs="10" md="4" l="4" xl="2">
          <v-form @submit.prevent="handleSignup">
            <v-text-field v-model="user.email" variant="outlined" rounded label="Email" required></v-text-field>
            <v-text-field v-model="user.password" variant="outlined" rounded label="Password" type="password"
                          required></v-text-field>
            <v-text-field v-model="user.confirmPassword" variant="outlined" rounded label="Confirm Password"
                          type="password" required></v-text-field>
            <v-btn type="submit" color="primary">Register</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleSignup() {
      this.$store.dispatch("auth/signup", this.user)
          .then(
              () => {
                this.$router.push("/login")
              }
          )
    }
  }
};

</script>
<style src="./Signup.scss" lang="scss" scoped/>
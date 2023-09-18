<template>
  <h2 class="text-center text-decoration-underline">Sign Up for an Account</h2>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="6">
      <v-form fast-fail @submit.prevent="handleSignup">
        <v-row>
          <v-col cols="12">
            <v-text-field
                label="Email"
                color="blue"
                class="mt-6"
                v-model="user.email"
                required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
                label="Password"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                color="blue"
                v-model="user.password"
                :rules="passwordRule"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
                label="Confirm Password"
                :type="showConfirmPassword ? 'text' : 'password'"
                color="blue"
                @click:append="showConfirmPassword = !showConfirmPassword"
                v-model="user.confirmPassword"
                :rules="confirmPasswordRule"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                required
            />
          </v-col>
        </v-row>
        <v-btn type="submit" color="blue" elevation="6" class="mt-5" tile>Sign up</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      passwordRule: [
        value => {
          if (value?.length > 8) return true
          return 'Password must be at least 8 characters.'
        },
      ],
      confirmPasswordRule: [
        value => {
          if (value === this.user.password) return true
          return 'Password must match previous password.'
        },
      ],
      showPassword: false,
      showConfirmPassword: false
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
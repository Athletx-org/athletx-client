<template>
  <h2 class="text-center text-decoration-underline">Sign up for an account</h2>
  <v-row align="center" justify="center" class="text-center" no-gutters>
    <v-col cols="12" sm="6">
      <v-form v-model="formValid" fast-fail @submit.prevent="handleSignup">
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email" color="cyan" variant="outlined" class="mt-6" v-model="user.email"
              prepend-icon="mdi-email" required autocomplete="false" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Password" :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword" color="cyan" variant="outlined" prepend-icon="mdi-key-variant"
              v-model="user.password" :rules="passwordRule" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              required />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Confirm Password" :type="showConfirmPassword ? 'text' : 'password'" color="cyan"
              variant="outlined" prepend-icon="mdi-key-variant" @click:append="showConfirmPassword = !showConfirmPassword"
              v-model="user.confirmPassword" :rules="confirmPasswordRule"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" required />
          </v-col>
        </v-row>
        <v-row no-gutters class="text-center" justify="center">
            <v-col cols="12" class="text-center">
              <v-checkbox class="text-center" color="success" label="I agree to site terms and conditions" />
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
      formValid: false,
      passwordRule: [
        value => {
          if (value?.length > 8) return true
          return 'Password must be at least 8 characters.'
        },
      ],
      confirmPasswordRule: [
        value => {
          if (value === this.user.password) return true
          return 'Passwords must match.'
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
      if (this.formValid) {
        this.$store.dispatch("auth/signup", this.user)
          .then(
            () => {
              console.log("fatto signup")
              this.$router.push("/")
            }
          )
      }
    }
  }
};

</script>
<style src="./Signup.scss" lang="scss" scoped/>
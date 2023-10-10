<template>
  <div>
    <h2 class="text-center text-decoration-underline">Login in to your account</h2>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" class="text-center">
        <v-form @submit.prevent="handleLogin" class="mt-12">
          <v-text-field class="mt-4 bg-white" v-model="email" label="Email" prepend-icon="mdi-email" variant="outlined"
            color="cyan" type="text" autocomplete="true" />
          <v-text-field class="mt-4 bg-white" v-model="password" label="Password" prepend-icon="mdi-key-variant"
            variant="outlined" type="password" color="cyan" placeholder="Password" />
          <div class="mb-3 text-red" v-show="loginError" color="red">Email or Password Incorrect </div>
          <v-btn color="blue" type="submit" dark tile class="text-center" elevation="6"><strong>Login</strong></v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginError: false
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch("auth/login", user)
        .then(() => {
          this.$router.push("/dashboard")
        }).catch(() => this.loginError = true )
    }
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped/>
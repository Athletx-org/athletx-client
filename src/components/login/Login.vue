<template>
  <div>
    <h2 class="text-center text-decoration-underline">Login in to your account</h2>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-form @submit.prevent="handleLogin" class="mt-12">
          <v-text-field
              class="mt-4 bg-white"
              v-model="email"
              label="Email"
              color="cyan"
              type="text"
              autocomplete="true"
          />
          <v-text-field class="mt-4 bg-white" v-model="password" type="password" placeholder="Password"/>
          <v-btn color="blue" type="submit" dark tile elevation="6"><strong>Login</strong></v-btn>
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
          .then(
              () => {
                this.$router.push("/dashboard")
              }
          )
    }
  }
};
</script>

<style src="./Login.scss" lang="scss" scoped/>
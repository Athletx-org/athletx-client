<template>
  <div>
    <h3 class="text-center">Login in to Your Account</h3>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-form fast-fail @submit.prevent="handleLogin">
          <v-text-field
              class="mt-4 bg-white"
              v-model="email"
              label="Email"
              color="cyan"
              type="text"
              autocomplete="true"
          />
          <v-text-field class="mt-4 bg-white" v-model="password" type="password" placeholder="Password"/>
          <v-btn color="blue" type="submit" dark tile>Log in</v-btn>
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
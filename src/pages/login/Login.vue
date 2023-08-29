<template>
    <h2>Login</h2>
    <div>
        <v-form @submit.prevent="handleLogin">
            <v-text-field v-model="email" type="text" placeholder="Username" />
            <v-text-field v-model="password" type="password" placeholder="Password" />
            <button type="submit">Invia</button>
        </v-form>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            email: "", 
            password: ""
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

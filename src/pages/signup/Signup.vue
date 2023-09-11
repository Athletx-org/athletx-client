<template>
  <v-main>
        <v-container fluid>
            <v-row justify="center">
                <v-col cols="12" xs="10" md="4" l="4" xl="2">
                    <v-form @submit.prevent="handleSignup">
                        <v-text-field v-model="email" variant="outlined" rounded label="Email" required></v-text-field>
                        <v-text-field v-model="name" variant="outlined" rounded label="Name" required></v-text-field>
                        <v-text-field v-model="surname" variant="outlined" rounded label="Surname" required></v-text-field>
                        <v-text-field v-model="height" variant="outlined" rounded label="Height" type="number"
                            required></v-text-field>
                        <v-text-field v-model="weight" variant="outlined" rounded label="Weight" type="number"
                            required></v-text-field>

                        <v-btn-toggle v-model="gender" rounded class="rounded-pill mb-4">
                            <v-btn :value="male" rounded class="flat" :color="'blue'">Male</v-btn>
                            <v-btn :value="female" class="flat" :color="'pink'">Female</v-btn>
                        </v-btn-toggle>
                        <div v-if="genderNotSelected" class="error-message"></div>
                        <!-- <v-date-picker></v-date-picker>                        -->
                        <v-text-field v-model="password" variant="outlined" rounded label="Password" type="password"
                            required></v-text-field>
                        <v-text-field v-model="confirmPassword" variant="outlined" rounded label="Confirm Password"
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
            email: '',
            name: '',
            surname: '',
            height: '',
            weight: '',
            birthdate: '',
            gender: '',
            password: '',
            confirmPassword: ''
        };
    },

    computed: {
        genderNotSelected() {
            return !this.gender;
        },
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
            const user = {
                email: this.email,
                name: this.name,
                surname: this.surname,
                height: this.height,
                weight: this.weight,
                birthdate: "2019-05-15T00:00:00.000Z",
                gender: "male",
                password: this.password,
                password_confirm: this.confirmPassword
            };
            this.$store.dispatch("auth/signup", user)
                .then(
                    () => {
                        this.$router.push("/login")
                    }
                )
        }
    }
};

</script>
<style src="./Signup.scss" lang="scss" scoped />
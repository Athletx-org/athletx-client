<template>
    <h2>Login</h2>
    <div>
        <form @submit.prevent="submitForm">
            <input v-model="email" type="text" placeholder="Username">
            <input v-model="password" type="password" placeholder="Password">
            <button type="submit">Invia</button>
        </form>
    </div>
</template>
  
  
<script>
import api from '@/services/api';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        submitForm() {
            const formData = {
                email: this.email,
                password: this.password
            };

            api.apiClient.post('/auth/loginAthlete', formData)
                .then(response => {
                    // Gestisci la risposta dal server
                    console.log(response)
                    this.$router.push('/profile');
                })
                .catch(error => {
                    console.error('Errore durante la richiesta:', error);
                });
        }
    }
};

</script>

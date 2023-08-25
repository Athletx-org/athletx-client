<template>
    <h2> Signup </h2>
    <div>
        <form @submit.prevent="submitForm">
            <input v-model="email" type="text" placeholder="Email">
            <input v-model="name" type="text" placeholder="Name">
            <input v-model="surname" type="text" placeholder="Surname">
            <input v-model="height" type="text" placeholder="Height(cm)">
            <input v-model="weight" type="text" placeholder="Wight(kg)">
            <input v-model="birthdate" type="text" placeholder="Birthdate">
            <input v-model="gender" type="text" placeholder="Gender">
            <input v-model="password" type="password" placeholder="Password">
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password">
            <button type="submit">Signup</button>
        </form>
    </div>
</template>
  
  
<script>
import api from '@/services/api';

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
    methods: {
        submitForm() {
            const formData = {
                email: this.email,
                name: this.name,
                surname: this.surname,
                height: this.height,
                weight: this.weight,
                birthdate: this.birthdate, 
                gender: this.gender,            
                password: this.password,
                password_confirm: this.confirmPassword
            };

            api.apiClient.post('/auth/registerAthlete', formData)
                .then(response => {
                    console.log('Risposta dal server:', response.data);
                    this.$router.push('/login');

                })
                .catch(error => {
                    console.error('Errore durante la richiesta:', error.response);
                });
        }
    }
};

</script>

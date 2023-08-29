<template>
    <div>
        {{ data }}
    </div>
    <v-btn @click.prevent="logout">
        <span>Logout</span>
      </v-btn>
  </template>
  
  <script>
import userService from '@/services/user.service';
  
  export default {
    data() {
      return {
        data: ""
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        userService.getUserInfo()
          .then(() => {
            this.data = "profile";
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
      }, 
      logout(){
        this.$store.dispatch("auth/logout")
        this.$router.push("/login")
      }
    }
  };
  </script>
  
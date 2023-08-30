<template>
    <div>
        {{ data }}
    </div>
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
          .then((response) => {
            console.log(response)
            this.data = "profile";
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
      },
    }
  };
  </script>

<style src="./Dashboard.scss" lang="scss" scoped />
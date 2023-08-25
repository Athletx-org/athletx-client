<template>
    <div>
        {{ data }}
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        data: null
      };
    },
    methods: {
      fetchData() {
        axios.get('/information')
          .then(response => {
            this.data = response.data;
          })
          .catch(error => {
            console.error('Errore durante la richiesta:', error);
          });
      }
    }
  };
  </script>
  
<template>
    <div class="home">
        <h1> HomePage</h1>
        <ul>
            <li v-for="number in serverMsg" :key="number">{{ number }}</li>
          </ul>
    </div>
</template>
<script>

import api from "../../services/api"


export default {
    name: "HomePage",
    data() {
        return {
            serverMsg: []
        }
    },
    created() {
        this.tryServerRequest();
    },
    methods: {
        async tryServerRequest() {
            try {
                const response = await api.provaGet()
                this.serverMsg = response.data()
            } catch (error) {
                console.error(error)
            }
        }
    }
};
</script>
import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'

Vue.createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')

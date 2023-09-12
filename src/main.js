import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'

Vue.createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .mount('#app')


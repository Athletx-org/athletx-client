import * as Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import VueDatePicker from '@vuepic/vue-datepicker';

Vue.createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .mount('#app')
    .component('VueDatePicker', VueDatePicker);


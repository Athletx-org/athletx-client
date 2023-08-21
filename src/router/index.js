import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../components/homepage/HomePage.vue'
import ExampleComponent from '../components/Example.vue'
import PageNotFound from '../components/pageNotFound/PageNotFound.vue'

const routes = [
  { path: '/', component: HomePage, alias: '/home' },
  { path: '/example', component: ExampleComponent },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: PageNotFound },
  { path: '/:pathMatch(.*)', name: 'bad-not-found', component: PageNotFound }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

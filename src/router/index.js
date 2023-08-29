import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "../pages/home/HomePage.vue";
import PageNotFound from "../pages/notFound/PageNotFound.vue";
import Login from "../pages/login/Login.vue";
import Signup from "../pages/signup/Signup.vue";
import Dashboard from "../pages/dashboard/dashboard.vue";
import store from '@/store'


const routes = [
  { path: "/", component: HomePage, alias: "/home" },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/dashboard", name: "dashboard", component: Dashboard, meta:{requiresAuth:true}},
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = store.state.auth.status.loggedIn
    if (auth) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router;

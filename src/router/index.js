import {createRouter, createWebHashHistory} from "vue-router";

import HomePage from "@/pages/home/HomePage.vue";
import PageNotFound from "@/pages/notFound/PageNotFound.vue";
import Login from "@/pages/login/Login.vue";
import Layout from "@/pages/layout/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Signup from "@/pages/signup/Signup.vue";
import store from '@/store'
import Profile from "@/pages/profile/Profile";

const routes = [
  {
    path: "/",
    component: HomePage,
    alias: "/home"
  },

  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  {
    path: "/dashboard",
    component: Layout,
    meta:{
      requiresAuth:true
    },
    children: [
    {
      path: '',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    ]
  },

  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

function isLoggedIn() {
  return store.state.auth.status.loggedIn
}

router.beforeEach((to, from, next) => {
  if ( (to.path === '/' || to.path==='/home' ) && isLoggedIn()) {
    next('/dashboard')
  }
  if (to.meta.requiresAuth) {
    if (isLoggedIn()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});


export default router;

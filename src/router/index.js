import { createRouter, createWebHashHistory } from "vue-router";

import Analytics from "@/pages/analytics/Analytics";
import Authentication from "@/pages/authentication/Authentication";
import HomePage from "@/pages/home/HomePage.vue";
import PageNotFound from "@/pages/notFound/PageNotFound.vue";
import Layout from "@/pages/layout/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Profile from "@/pages/profile/Profile";
import Workouts from "@/pages/workouts/Workouts";
import Goal from "@/pages/goal/Goal.vue";
import store from "@/store";
import CreateEditWorkout from "@/pages/createEditWorkout/CreateEditWorkout";

const routes = [
  {
    path: "/",
    component: HomePage,
    alias: "/home",
  },

  { path: "/login", name: "login", component: Authentication },
  { path: "/signup", name: "signup", component: Authentication },
  { path: "/", component: Layout, meta: { requiresAuth: true },
    children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/workouts',
      name: 'Workouts',
      component: Workouts
    },
    {
      path: '/workouts/:workoutId',
      name: 'WorkoutForm',
      component: CreateEditWorkout
    },
    {
      path: '/goals',
      name: 'Goals',
      component: Goal
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
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
  return store.state.auth.status.loggedIn;
}

router.beforeEach((to, from, next) => {
  if ((to.path === "/" || to.path === "/home") && isLoggedIn()) {
    next("/dashboard");
  }
  if (to.meta.requiresAuth) {
    if (isLoggedIn()) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;

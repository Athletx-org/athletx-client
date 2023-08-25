import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "../components/homepage/HomePage.vue";
import ExampleComponent from "../components/Example.vue";
import PageNotFound from "../components/pageNotFound/PageNotFound.vue";
import Login from "../components/authentication/Login.vue";
import Signup from "../components/authentication/Signup.vue";
import Profile from "../components/profile.vue";

const routes = [
  { path: "/", component: HomePage, alias: "/home" },
  { path: "/example", component: ExampleComponent },
  { path: "/login", name: "login", component: Login },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/profile", name: "profile", component: Profile },
  { path: "/:pathMatch(.*)*", name: "not-found", component: PageNotFound },
  { path: "/:pathMatch(.*)", name: "bad-not-found", component: PageNotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

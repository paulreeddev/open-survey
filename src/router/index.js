import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Survey from "../views/Survey.vue";
import Surveys from "../views/Surveys.vue";
import SurveyAnswers from "../views/SurveyAnswers.vue";
import CollectSurvey from "../views/CollectSurvey.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/surveys",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/surveys",
        name: "surveys",
        component: Surveys,
      },
      {
        path: "/surveys/:id",
        name: "survey",
        component: Survey,
      },
      {
        path: "/surveys/:id/answers",
        name: "surveyAnswers",
        component: SurveyAnswers,
      },
    ],
  },
  {
    path: "/survey/:slang",
    name: "collectSurvey",
    meta: { isGuest: true },
    component: CollectSurvey,
  },
  {
    path: "/login",
    name: "login",
    meta: { isGuest: true },
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    meta: { isGuest: true },
    component: Register,
  },
  {
    path: "/404",
    name: "notFound",
    meta: { isGuest: true },
    component: NotFound,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ "../views/AboutView.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("to: ", to);
  console.log("from: ", from);
  console.log("________________________________________________________");
  console.log(
    to.meta.requiresAuth,
    store.state.user.token,
    to.meta.requiresAuth && !store.getters.user.token
  );
  console.log(
    store.state.user.token,
    to.meta.isGuest,
    store.state.user.token && to.meta.isGuest
  );
  console.log("________________________________________________________");
  if (to.name == "collectSurvey") {
    next();
  } else if (to.meta.requiresAuth && !store.getters.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "surveys" });
  } else {
    next();
  }
});

export default router;

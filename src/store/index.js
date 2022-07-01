import Vue from "vue";
import Vuex from "vuex";
import axiosClient from "../axios";
import { v4 as uuidv4 } from "uuid";
import router from "@/router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarMessage: "",
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    formfields: [],
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    currentSurvey: {
      data: {},
      loading: false,
    },
  },
  mutations: {
    AddFormField(state, formfield) {
      state.formfields.push(formfield);
    },
    UpdateFormField(state, formfield) {
      state.formfields.forEach((element) => {
        element = formfield;
      });
    },
    DeleteFormField(state, formfield) {
      state.formfields.forEach((element, index) => {
        if (element.id === formfield.id) {
          state.formfields.splice(index, 1);
        }
      });
    },
    setFormFields(state, formfields) {
      state.formfields = formfields;
    },
    logout: (state) => {
      state.user.token = null;
      state.user.data = {};
      sessionStorage.removeItem("TOKEN");
    },

    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      sessionStorage.setItem("TOKEN", token);
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.links = surveys.meta.links;
      state.surveys.data = surveys.data;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setSnackbar: (state, snackbar) => {
      state.snackbar = snackbar;
    },
    setSnackbarMessage: (state, message) => {
      state.snackbarMessage = message;
    },
  },
  actions: {
    register({ commit }, user) {
      return axiosClient.post("/register", user).then((response) => {
        commit("setUser", response.data.user);
        commit("setToken", response.data.token);
        return response.data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data.user);
        commit("setToken", data.token);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        router.push({
          name: "login",
        });
        return response;
      });
    },
    getUser({ commit }) {
      return axiosClient.get("/user").then((res) => {
        commit("setUser", res.data);
      });
    },
    getSurveys({ commit }, { url = null } = {}) {
      commit("setSurveysLoading", true);
      url = url || "/survey";
      return axiosClient.get(url).then((res) => {
        commit("setSurveysLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit(
            "setFormFields",
            JSON.parse(res.data.data.survey_questions_JSON)
          );
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit(
            "setFormFields",
            JSON.parse(res.data.data.survey_questions_JSON)
          );
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurvey({ commit, dispatch, state }, survey) {
      delete survey.image_url;

      let response;
      if (survey.id) {
        survey.survey_questions_JSON = JSON.stringify(state.formfields);
        console.log(survey);
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }
      return response;
    },
    saveSurveyAnswer({ commit, state }, answer) {
      console.log("answer::::;", answer);
      return axiosClient.post(`/survey/${state.currentSurvey.data.id}/answer`, {
        answer,
      });
    },
    deleteSurvey({ dispatch }, id) {
      return axiosClient.delete(`/survey/${id}`).then((res) => {
        dispatch("getSurveys");
        return res;
      });
    },
    addFormField({ commit }, formfield) {
      if (formfield.id) {
        commit("UpdateFormField", formfield);
      } else {
        formfield.id = uuidv4();
        commit("AddFormField", formfield);
      }
      console.log(formfield);
    },
    deleteFormField({ commit }, formfield) {
      commit("DeleteFormField", formfield);
    },
    showMessage({ commit }, message) {
      commit("setSnackbar", true);
      commit("setSnackbarMessage", message);
    },
  },
  modules: {},
  getters: {
    formfields: (state) => {
      return state.formfields;
    },
    user: (state) => {
      return state.user.data;
    },
    surveys: (state) => {
      return state.surveys.data;
    },
    currentSurvey: (state) => {
      return state.currentSurvey.data;
    },
    snackbar: (state) => {
      return state.snackbar;
    },
    snackbarMessage: (state) => {
      return state.snackbarMessage;
    },
  },
});

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const data_url = "https://my-json-server.typicode.com/zaszczyk/demo/comments";
const server_url = "http://jsonplaceholder.typicode.com/posts";
const mentioned_url = "https://my-json-server.typicode.com/zaszczyk/demo/users";

export default new Vuex.Store({
  state: {
    items: [],
    metioned: []
  },
  getters: {
    items: state => {
      return state.items;
    },
    metioned: state => {
      return state.metioned;
    }
  },
  mutations: {
    setItem(state, items) {
      state.items = items;
    },
    setMetioned(state, metioned) {
      state.metioned = metioned;
    }
  },
  actions: {
    loadItems({ commit }) {
      axios
        .get(data_url)
        .then(response => response.data)
        .then(items => {
          commit("setItem", items);
        });
    },

    loadMetioned({ commit }) {
      axios
        .get(mentioned_url)
        .then(response => response.data)
        .then(metioned => {
          commit("setMetioned", metioned);
          console.log(metioned);
        });
    },

    addComment() {
      //Wykonuje post do servera i wrzucam do konsoli status i statusText
      axios.post(server_url).then(
        response => {
          console.log(response, response.statusText);
        },
        error => {
          console.log(error);
        }
      );
    }
  },

  modules: {}
});

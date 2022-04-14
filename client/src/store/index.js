import Vue from 'vue'
import Vuex from 'vuex'
import authModule from "./modules/auth"
import eventModule from "./modules/event"
import io from "socket.io-client";

Vue.use(Vuex)

const url = process.env.VUE_APP_SERVER_URL;
const socket = io(url);

export default new Vuex.Store({
  state: {
    serverUrl: url,
    socket
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule,
    eventModule
  }
})

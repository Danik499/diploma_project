import Vue from 'vue'
import Vuex from 'vuex'
import authModule from "./modules/auth"
import eventModule from "./modules/event"
import subscription from "./getSubscription"
import io from "socket.io-client";

const url = process.env.VUE_APP_SERVER_URL;
const socket = io(url);

Vue.use(Vuex)

// console.log(subscription)

export default new Vuex.Store({
  state: {
    serverUrl: url,
    subscription,
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
